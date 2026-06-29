import React from 'react';

function ErrorAlert({ error, onDismiss }) {
  if (!error) return null;

  let errorMessage = '';
  let details = [];

  if (typeof error === 'string') {
    errorMessage = error;
  } else {
    // Handle normalized error object from Axios interceptor
    if (error.status === 400 || error.status === 422) {
      errorMessage = error.data?.message || 'Validation error. Please check your inputs.';
      
      // Handle Spring Boot standard validation error format
      if (error.data?.errors && Array.isArray(error.data.errors)) {
        details = error.data.errors;
      }
    } else if (error.status === 404) {
      errorMessage = error.data?.message || 'The requested resource was not found (404).';
    } else if (error.status >= 500) {
      errorMessage = 'A server error occurred. Please try again later.';
    } else if (error.message === 'Network Error') {
      errorMessage = 'Network error. Please check your internet connection and verify the server is running.';
    } else {
      errorMessage = error.data?.message || error.message || 'An unexpected error occurred.';
    }
  }

  return (
    <div className="error-alert">
      <div className="error-content">
        <p><strong>Error:</strong> {errorMessage}</p>
        {details.length > 0 && (
          <ul className="error-details">
            {details.map((detail, index) => (
              <li key={index}>
                 {typeof detail === 'string' ? detail : `${detail.field}: ${detail.defaultMessage || detail.message}`}
              </li>
            ))}
          </ul>
        )}
      </div>
      {onDismiss && (
        <button type="button" className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
          &times;
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;
