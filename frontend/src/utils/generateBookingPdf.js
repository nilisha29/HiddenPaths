import jsPDF from "jspdf";
import { formatCurrency, formatDate } from "./format";

/**
 * Builds and downloads a real PDF receipt for a confirmed booking — used by
 * the "Save to PDF" button on the Confirmation page. Client-side generation
 * (no backend dependency), so it works instantly with no extra request.
 */
export const generateBookingPdf = (booking) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;
  let y = 70;

  // Header
  doc.setFont("times", "bolditalic");
  doc.setFontSize(24);
  doc.setTextColor(181, 71, 27); // rust
  doc.text("HiddenPaths", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Booking Confirmation & Receipt", margin, y + 18);

  y += 50;
  doc.setDrawColor(220, 210, 195);
  doc.line(margin, y, pageWidth - margin, y);
  y += 36;

  // Reference + status
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text("Reference Number", margin, y);
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(181, 71, 27);
  doc.text(booking.referenceNumber || "—", margin, y + 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(31, 107, 50);
  doc.text("CONFIRMED", pageWidth - margin - 70, y);

  y += 48;
  doc.setDrawColor(230, 230, 230);
  doc.line(margin, y, pageWidth - margin, y);
  y += 30;

  const row = (label, value) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(140, 140, 140);
    doc.text(label.toUpperCase(), margin, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(String(value), margin, y + 16);
    y += 40;
  };

  row("Guest", booking.fullName);
  row("Email", booking.email);
  row("Experience", booking.experienceId?.title || "—");
  row("Destination", booking.experienceId?.location || "—");
  row("Arrival Date", formatDate(booking.date));
  row("Guests", `${booking.numberOfPeople} traveler(s)`);
  row("Hosted By", booking.guideId?.name || "—");

  y += 10;
  doc.setDrawColor(220, 210, 195);
  doc.line(margin, y, pageWidth - margin, y);
  y += 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);
  doc.text("Total Paid", margin, y);
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(181, 71, 27);
  doc.text(formatCurrency(booking.totalPrice), pageWidth - margin - 120, y);

  y += 60;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Thank you for booking with HiddenPaths — your journey directly supports local Nepali hosts.",
    margin,
    y,
    { maxWidth: pageWidth - margin * 2 }
  );

  doc.save(`HiddenPaths-${booking.referenceNumber || "receipt"}.pdf`);
};

export default generateBookingPdf;
