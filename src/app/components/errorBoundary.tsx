"use client";

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ThreeDModelErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    console.log('[ErrorBoundary] Initialized');
  }

  private isMobileDevice(): boolean {
    return typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('[ErrorBoundary] Error caught in getDerivedStateFromError:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'SSR'
    });
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const isMobile = this.isMobileDevice();
    console.error('[ErrorBoundary] componentDidCatch - Detailed error info:', {
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack
      },
      errorInfo,
      deviceInfo: {
        isMobile,
        userAgent: navigator.userAgent,
        screen: { width: screen.width, height: screen.height },
        devicePixelRatio: window.devicePixelRatio,
        webglSupport: this.checkWebGLSupport()
      },
      timestamp: new Date().toISOString()
    });
  }

  private checkWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  }

  render() {
    const isMobile = this.isMobileDevice();
    
    if (this.state.hasError) {
      console.warn('[ErrorBoundary] Rendering error fallback UI', {
        isMobile,
        errorMessage: this.state.error?.message,
        hasFallback: !!this.props.fallback
      });
      
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full bg-gray-100 rounded-lg relative min-h-[320px] flex items-center justify-center">
          <div className="text-center max-w-md p-4">
            <div className="text-red-600 mb-2 font-medium">
              {isMobile ? '3D Model not supported on this device' : 'Unable to load 3D model'}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              {isMobile 
                ? 'Your device may not support 3D graphics or have insufficient memory' 
                : this.state.error?.message || 'An unknown error occurred'
              }
            </div>
            <button 
              onClick={() => {
                console.log('[ErrorBoundary] User clicked retry button');
                this.setState({ hasError: false, error: undefined });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    console.log('[ErrorBoundary] Rendering children normally');
    return this.props.children;
  }
}