import React, { useEffect, useState } from "react";
import "../../styles/imageUploader.css";

/**
 * Multi-image picker with thumbnail previews, used by both the Guide and
 * Admin experience forms. Selecting new files fully replaces the gallery
 * (matches the backend's "replace on new upload" behavior) — existing
 * images are shown read-only until the user picks new ones.
 */
const ImageUploader = ({ existingImages = [], files, onChange, maxFiles = 5 }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files).slice(0, maxFiles);
    onChange(selected);
  };

  const removeAt = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader">
      {files.length === 0 && existingImages.length > 0 && (
        <>
          <p className="field-hint" style={{ marginBottom: 8 }}>
            Current gallery ({existingImages.length} image{existingImages.length !== 1 ? "s" : ""}).
            Choose new photos below to replace it.
          </p>
          <div className="image-uploader-grid">
            {existingImages.map((src, i) => (
              <div key={i} className="image-uploader-thumb">
                <img src={src} alt={`Current ${i + 1}`} />
                {i === 0 && <span className="image-uploader-cover-tag">Cover</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {files.length > 0 && (
        <div className="image-uploader-grid" style={{ marginBottom: 12 }}>
          {previews.map((src, i) => (
            <div key={i} className="image-uploader-thumb">
              <img src={src} alt={`Selected ${i + 1}`} />
              {i === 0 && <span className="image-uploader-cover-tag">Cover</span>}
              <button type="button" className="image-uploader-remove" onClick={() => removeAt(i)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="image-uploader-dropzone">
        <input type="file" multiple accept="image/*" onChange={handleFiles} hidden />
        <span>📷 Click to choose up to {maxFiles} photos</span>
        <span className="field-hint">First photo becomes the cover image shown on Explore.</span>
      </label>
    </div>
  );
};

export default ImageUploader;
