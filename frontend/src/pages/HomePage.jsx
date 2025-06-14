import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/ApiService";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Hero from "../components/Hero";

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
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Hero />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link
            to="/apod"
            className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl shadow-lg overflow-hidden border border-[#23244a] transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]"
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
            className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl shadow-lg overflow-hidden border border-[#23244a] transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]"
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
            className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl shadow-lg overflow-hidden border border-[#23244a] transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]"
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
            className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl shadow-lg overflow-hidden border border-[#23244a] transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]"
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
            <div className="bg-[#1A1C2C] rounded-lg overflow-hidden shadow-lg border border-[#23244a]">
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
                    className="mt-4 inline-block bg-[#181929] text-white font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-300 group-hover:bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] hover:scale-105 hover:shadow-[0_0_16px_#00d1ff99] hover:border-cyan-400 border border-[#23244a]"
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
        <div className="bg-[#1A1C2C] bg-opacity-80 rounded-lg p-6 shadow-lg border border-[#23244a]">
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
