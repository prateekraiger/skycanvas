import { useState, useEffect } from "react";
import apiService from "../services/ApiService";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Hero from "../components/Hero";
import About from "../components/About";
import CallToAction from "../components/CallToAction";

const HomePage = () => {
  const [apodData, setApodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAPODData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getAPOD();
        setApodData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to load APOD data:", err);
        setError(
          "Failed to load Astronomy Picture of the Day. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAPODData();
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="px-2 sm:px-4 lg:px-6 py-2">
        {/* Hero Section */}
        <Hero />

        {/* About Section (now main content) */}
        <About />

        {/* Call to Action Section */}
        <CallToAction />
      </div>
    </div>
  );
};

export default HomePage;
