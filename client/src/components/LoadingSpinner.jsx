import React from 'react';
//import './LoadingSpinner.css';

function LoadingSpinner({ message = 'Loading...', fullScreen = true }) {
  return (
    <div
      className={fullScreen ? 'spinner-overlay' : 'spinner-inline'}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;