import React, { useContext } from "react";
import ToastContext from "../../context/ToastContext";
import "../../styles/toast.css";

const ICONS = { success: "✓", error: "✕", info: "ℹ" };

const ToastContainer = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) return null;
  const { toasts, removeToast } = ctx;

  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} onClick={() => removeToast(t.id)}>
          <span className="toast-icon">{ICONS[t.type] || ICONS.info}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
