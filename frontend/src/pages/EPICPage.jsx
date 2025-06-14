import { useState, useEffect } from "react";
import apiService from "../services/ApiService";
import ImageGallery from "../components/common/ImageGallery";
import LoadingIndicator from "../components/common/LoadingIndicator";

const EPICPage = () => {
  const [type, setType] = useState("natural");
  const [date, setDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available dates on mount
  useEffect(() => {
    const fetchDates = async () => {
      setAvailableDates([]);
      try {
        const response = await apiService.getAvailableEPICDates(type);
        setAvailableDates(response.dates || response.data || []);
      } catch (err) {
        setAvailableDates([]);
      }
    };
    fetchDates();
  }, [type]);

  // Fetch images when type or date changes
  const fetchImages = async () => {
    if (!date) return;
    setIsLoading(true);
    setError(null);
    setImages([]);
    try {
      const response = await apiService.getEPICImages(date, type);
      setImages(response.images || response.data || []);
    } catch (err) {
      setError("Failed to fetch EPIC images. Try another date or type.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (date) fetchImages();
    // eslint-disable-next-line
  }, [date, type]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Earth View (EPIC)</h1>
          <p className="text-gray-300 mt-2">
            View stunning images of Earth captured by NASA's EPIC camera. Select
            image type and date to explore.
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 mb-8 shadow-lg flex flex-col md:flex-row gap-4 items-end">
          <div>
            <label className="block text-gray-400 mb-1">Image Type</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setDate("");
              }}
              className="bg-slate-700 text-white py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="natural">Natural</option>
              <option value="enhanced">Enhanced</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Date</label>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-700 text-white py-2 px-3 rounded border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a date</option>
              {availableDates.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            message="Loading EPIC images..."
          />
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        ) : (
          <ImageGallery images={images} />
        )}
      </div>
    </div>
  );
};

export default EPICPage;
