import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/mapView.css";

/**
 * Real interactive map using Leaflet + OpenStreetMap tiles — no API key
 * required. Used both read-only (Experience Detail's "Where you'll be")
 * and as a location picker (Guide/Admin experience forms, when `onPick`
 * is supplied — clicking the map updates the marker and calls onPick).
 */
const MapView = ({
  latitude,
  longitude,
  label = "",
  height = 260,
  zoom = 13,
  onPick,
}) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Create the map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [latitude, longitude],
      zoom,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: "map-pin-icon",
      html: '<div class="map-pin-dot"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });

    const marker = L.marker([latitude, longitude], { icon, draggable: Boolean(onPick) }).addTo(map);
    if (label) marker.bindPopup(label);
    markerRef.current = marker;

    if (onPick) {
      map.on("click", (e) => {
        marker.setLatLng(e.latlng);
        onPick(e.latlng.lat, e.latlng.lng);
      });
      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        onPick(pos.lat, pos.lng);
      });
    }

    setTimeout(() => map.invalidateSize(), 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep marker/view in sync when coordinates change from outside (e.g.
  // typing new lat/lng values into the form fields)
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    markerRef.current.setLatLng([latitude, longitude]);
    mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
    if (label) markerRef.current.bindPopup(label);
  }, [latitude, longitude, label]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="map-view" style={{ height }} />;
};

export default MapView;
