import React from "react";

const steps = [
  { key: "details", label: "Details" },
  { key: "payment", label: "Payment" },
  { key: "confirmed", label: "Confirmed" },
];

const BookingSteps = ({ active }) => {
  const activeIndex = steps.findIndex((s) => s.key === active);
  return (
    <div className="booking-steps">
      {steps.map((step, i) => (
        <React.Fragment key={step.key}>
          <div className={`booking-step${i <= activeIndex ? " active" : ""}`}>
            <span className="booking-step-circle">{i + 1}</span>
            <span>{step.label}</span>
          </div>
          {i < steps.length - 1 && <span className="booking-step-line" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookingSteps;
