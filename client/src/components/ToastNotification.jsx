import React, { useEffect } from 'react';
//import './ToastNotification.css';

function ToastNotification({
  message = '',
  type = 'info',
  duration = 3000,
  onClose = () => {}
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
      aria-live="assertive"
    >
      <span>{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ✖
      </button>
    </div>
  );
}

export default ToastNotification;




