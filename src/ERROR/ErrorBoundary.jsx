import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="error-container">
 
          <p className="bg-red-300 px-2 py-1 rounded-md">Something went wrong. With the Leture Editor.</p>
          {/* <p className="bg-red-300 px-2 py-1 rounded-md m-3"> </p> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
