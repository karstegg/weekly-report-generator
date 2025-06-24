import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
          <p>A part of the report could not be displayed due to an unexpected error.</p>
          <p>Please try refreshing the page. If the problem persists, please contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
