import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/ApiService";
import LoadingIndicator from "../components/common/LoadingIndicator";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10 pt-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            SkyCanvas
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the wonders of space through NASA's rich data and imagery.
            Discover the universe from Earth to the stars and beyond.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            to="/apod"
            className="bg-slate-800 hover:bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-colors"
          >
            <div className="p-6">
              <div className="text-blue-400 text-3xl mb-4">
                <i className="fas fa-image"></i>
              </div>
              <h2 className="text-xl font-bold mb-2">
                Astronomy Picture of the Day
              </h2>
              <p className="text-gray-400">
                Discover the cosmos with NASA's daily featured image and
                explanation.
              </p>
            </div>
          </Link>

          <Link
            to="/mars-rover"
            className="bg-slate-800 hover:bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-colors"
          >
            <div className="p-6">
              <div className="text-red-400 text-3xl mb-4">
                <i className="fas fa-robot"></i>
              </div>
              <h2 className="text-xl font-bold mb-2">Mars Rover Gallery</h2>
              <p className="text-gray-400">
                Explore Mars through the eyes of NASA's rovers with thousands of
                surface images.
              </p>
            </div>
          </Link>

          <Link
            to="/epic"
            className="bg-slate-800 hover:bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-colors"
          >
            <div className="p-6">
              <div className="text-green-400 text-3xl mb-4">
                <i className="fas fa-globe"></i>
              </div>
              <h2 className="text-xl font-bold mb-2">Earth View</h2>
              <p className="text-gray-400">
                View stunning images of Earth captured by NASA's EPIC camera.
              </p>
            </div>
          </Link>

          <Link
            to="/asteroids"
            className="bg-slate-800 hover:bg-slate-700 rounded-lg shadow-lg overflow-hidden transition-colors"
          >
            <div className="p-6">
              <div className="text-yellow-400 text-3xl mb-4">
                <i className="fas fa-meteor"></i>
              </div>
              <h2 className="text-xl font-bold mb-2">Asteroid Tracker</h2>
              <p className="text-gray-400">
                Track near-Earth objects and visualize asteroid data from NASA's
                NEO database.
              </p>
            </div>
          </Link>
        </div>

        {/* Today's APOD Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-2">
            Today's Astronomy Picture of the Day
          </h2>

          {isLoading ? (
            <LoadingIndicator
              isLoading={isLoading}
              message="Loading today's featured image..."
            />
          ) : error ? (
            <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          ) : apodData ? (
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4">
                  {apodData.media_type === "image" ? (
                    <img
                      src={apodData.url}
                      alt={apodData.title}
                      className="w-full h-auto rounded shadow-lg"
                    />
                  ) : apodData.media_type === "video" ? (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={apodData.url}
                        title={apodData.title}
                        className="w-full h-full rounded"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-slate-700 rounded">
                      <p className="text-gray-400">Media type not supported</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{apodData.title}</h3>
                  <p className="text-gray-400 mb-4">
                    {new Date(apodData.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 line-clamp-6">
                    {apodData.explanation}
                  </p>
                  <Link
                    to="/apod"
                    className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Explore More APOD Images
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-10">
              <p className="text-gray-400">No data available</p>
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">About SkyCanvas</h2>
          <p className="text-gray-300 mb-4">
            SkyCanvas is a web application that visualizes and explores various
            NASA APIs, providing an interactive way to discover space data,
            imagery, and knowledge.
          </p>
          <p className="text-gray-300">
            This application uses NASA's open APIs including APOD, Mars Rovers,
            EPIC, and the Near Earth Object Web Service (NeoWs). All images and
            data are sourced directly from NASA's public repositories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
