import { useState, useEffect } from "react";
import ImageGallery from "../components/common/ImageGallery";
import LoadingIndicator from "../components/common/LoadingIndicator";
import apiService from "../services/ApiService";

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";

const ROVER_INFO = {
  curiosity: {
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    description:
      "Curiosity is a car-sized rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory mission.",
    image:
      "https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg",
  },
  opportunity: {
    name: "Opportunity",
    landing_date: "2004-01-25",
    launch_date: "2003-07-07",
    status: "complete",
    description:
      "Opportunity was active from 2004 to 2018 and holds the record for the longest distance driven by any off-Earth wheeled vehicle.",
    image:
      "https://mars.nasa.gov/system/feature_items/images/6452_opportunity_banner.jpg",
  },
  spirit: {
    name: "Spirit",
    landing_date: "2004-01-04",
    launch_date: "2003-06-10",
    status: "complete",
    description:
      "Spirit was active from 2004 to 2010 and made important discoveries about wet conditions on ancient Mars.",
    image:
      "https://mars.nasa.gov/system/feature_items/images/6453_spirit_banner.jpg",
  },
  perseverance: {
    name: "Perseverance",
    landing_date: "2021-02-18",
    launch_date: "2020-07-30",
    status: "active",
    description:
      "Perseverance is searching for signs of ancient life and collecting samples of rock and regolith for possible return to Earth.",
    image:
      "https://mars.nasa.gov/system/feature_items/images/6038_Perseverance_banner.jpg",
  },
};

const MAIN_CAMERAS = {
  FHAZ: "Front Hazard Avoidance Camera",
  RHAZ: "Rear Hazard Avoidance Camera",
  MAST: "Mast Camera",
  NAVCAM: "Navigation Camera",
  PANCAM: "Panoramic Camera",
  CHEMCAM: "Chemistry and Camera Complex",
  MAHLI: "Mars Hand Lens Imager",
  MARDI: "Mars Descent Imager",
  MCZ_LEFT: "Mastcam-Z Left",
  MCZ_RIGHT: "Mastcam-Z Right",
};

const statusColors = {
  active: "bg-green-700 text-green-200",
  complete: "bg-gray-700 text-gray-300",
};

const MarsRoverPage = () => {
  const [rover, setRover] = useState("curiosity");
  const [sol, setSol] = useState(1000);
  const [earthDate, setEarthDate] = useState("");
  const [camera, setCamera] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [roverInfo, setRoverInfo] = useState(ROVER_INFO[rover]);

  useEffect(() => {
    setRoverInfo(ROVER_INFO[rover]);
  }, [rover]);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
    fetchImages(1, true);
    // eslint-disable-next-line
  }, [rover, sol, earthDate, camera]);

  const fetchImages = async (pageToFetch = 1, reset = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        page: pageToFetch,
      };
      if (sol) params.sol = sol;
      if (earthDate) params.earth_date = earthDate;
      if (camera) params.camera = camera;
      const response = await apiService.getMarsRoverPhotos(rover, params);
      const data = response.photos || response.data?.photos || [];
      if (Array.isArray(data)) {
        if (reset) {
          setImages(data);
        } else {
          setImages((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === 25); // Backend returns max 25 per page
      } else {
        setHasMore(false);
        if (reset) setImages([]);
      }
    } catch (err) {
      setError(
        "Failed to fetch Mars Rover images. Try adjusting your filters."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage);
  };

  const handleRandomSol = () => {
    // Random sol between 0 and 3000 for fun
    const randomSol = Math.floor(Math.random() * 3000);
    setSol(randomSol);
    setEarthDate("");
    setPage(1);
    setImages([]);
    setHasMore(true);
  };

  return (
    <div className="min-h-screen  relative overflow-x-hidden">
      <header className="relative z-10 py-10 mb-10 text-center">
        <div className="flex flex-col items-center justify-center mb-2">
          <span className="text-5xl text-orange-400 mb-2">
            <i className="fas fa-mars"></i>
          </span>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 drop-shadow-lg">
            Mars Rover Gallery
          </h1>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore Mars through the eyes of NASA's rovers. Filter by rover, sol,
          earth date, or camera. Powered by NASA's public API.
        </p>
      </header>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Rover Info Card */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="backdrop-blur-md bg-slate-800/90 rounded-2xl shadow-2xl p-6 flex flex-col items-center w-full md:w-1/2 relative overflow-hidden border border-slate-700">
            <img
              src={roverInfo.image}
              alt={roverInfo.name}
              className="w-full max-h-40 object-cover rounded-xl shadow mb-4 border-2 border-slate-700"
            />
            <h2 className="text-3xl font-bold text-orange-200 mb-2 drop-shadow">
              {roverInfo.name}
            </h2>
            <p className="text-gray-300 mb-4 text-center">
              {roverInfo.description}
            </p>
            <div className="flex flex-wrap gap-2 text-sm justify-center">
              <span className="bg-slate-700 px-3 py-1 rounded-full text-gray-300">
                Landing: {roverInfo.landing_date}
              </span>
              <span className="bg-slate-700 px-3 py-1 rounded-full text-gray-300">
                Launch: {roverInfo.launch_date}
              </span>
              <span
                className={`$${
                  statusColors[roverInfo.status]
                } px-3 py-1 rounded-full`}
              >
                Status: {roverInfo.status}
              </span>
            </div>
          </div>
          {/* Filter Form */}
          <form
            className="backdrop-blur-md bg-slate-800/90 rounded-2xl shadow-lg p-6 flex flex-col gap-4 w-full md:w-1/2 border border-slate-700"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              setImages([]);
              setHasMore(true);
              fetchImages(1, true);
            }}
          >
            <h3 className="text-xl font-bold text-orange-100 mb-2">
              Filter Photos
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">Rover</label>
              <select
                value={rover}
                onChange={(e) => setRover(e.target.value)}
                className="bg-slate-700 text-white py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              >
                {Object.keys(ROVER_INFO).map((r) => (
                  <option key={r} value={r}>
                    {ROVER_INFO[r].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">
                Sol (Martian day)
              </label>
              <input
                type="number"
                min="0"
                value={sol}
                onChange={(e) => {
                  setSol(e.target.value);
                  setEarthDate("");
                }}
                placeholder="e.g. 1000"
                className="bg-slate-700 text-white py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">Earth Date</label>
              <input
                type="date"
                value={earthDate}
                onChange={(e) => {
                  setEarthDate(e.target.value);
                  setSol("");
                }}
                className="bg-slate-700 text-white py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">Camera</label>
              <select
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                className="bg-slate-700 text-white py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
              >
                <option value="">All</option>
                {Object.entries(MAIN_CAMERAS).map(([code, name]) => (
                  <option key={code} value={code} title={name}>
                    {name} ({code})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors flex-1 shadow-lg"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleRandomSol}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded transition-colors flex-1 shadow-lg"
              >
                Random Sol
              </button>
            </div>
          </form>
        </div>
        {/* Gallery and Results */}
        {isLoading && page === 1 ? (
          <LoadingIndicator
            isLoading={isLoading}
            message="Loading Mars Rover images..."
          />
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <ImageGallery images={images} cameraTooltips={MAIN_CAMERAS} />
            {hasMore && !isLoading && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
            {isLoading && page > 1 && (
              <div className="flex justify-center mt-4">
                <LoadingIndicator
                  isLoading={isLoading}
                  message="Loading more images..."
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarsRoverPage;
