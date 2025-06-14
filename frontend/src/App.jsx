import { useState, useEffect } from "react";
import Router from "./components/Router";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <h1 className="text-3xl font-bold mt-6 text-white">SkyCanvas</h1>
          <p className="text-gray-300 mt-2">Loading the universe...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        <Router />
      </div>
    </ErrorBoundary>
  );
}

export default App;
