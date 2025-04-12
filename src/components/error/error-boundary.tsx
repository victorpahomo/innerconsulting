"use client";
import React from "react";

import { Button } from "../ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <DefaultErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error | null;
  resetError?: () => void;
}

export function DefaultErrorFallback({
  error,
  resetError,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-red-50 text-red-800 border border-red-200 shadow-sm my-4">
      <h2 className="text-2xl font-semibold mb-2">Algo salió mal</h2>
      <p className="text-center mb-4">
        {error?.message || "Se ha producido un error inesperado."}
      </p>
      {resetError && (
        <Button variant="primary" onClick={resetError}>
          Intentar nuevamente
        </Button>
      )}
      <p className="text-sm text-red-600 mt-4">
        Si el problema persiste, por favor contacte a soporte técnico.
      </p>
    </div>
  );
}
