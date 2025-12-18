import React from 'react';
import { useToast } from '../context/ToastContext';
import '../styles/toasts.css';

export default function Toasts() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toasts-container" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div className="toast-message">{t.message}</div>
          <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Dismiss">×</button>
        </div>
      ))}
    </div>
  );
}
