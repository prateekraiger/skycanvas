import { useState, useEffect } from "react";
import apiService from "../services/ApiService";
import LoadingIndicator from "../components/common/LoadingIndicator";
import AnimatedTitle from "../components/AnimatedTitle";
import ImageGallery from "../components/common/ImageGallery";

const EPICPage = () => {
  const [epicData, setEpicData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEPICData = async () => {
      try {
        setIsLoading(true);
        const formattedDate = date.toISOString().split("T")[0];
        const response = await apiService.getEPIC(formattedDate);
        setEpicData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load EPIC data. Please try again later.");
        setEpicData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEPICData();
  }, [date]);

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  const images = epicData.map((item) => ({
    id: item.identifier,
    url: `https://epic.gsfc.nasa.gov/archive/natural/${date
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "/")}/png/${item.image}.png`,
    title: item.caption,
    date: item.date,
  }));

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <AnimatedTitle text1="Earth Polychromatic Imaging Camera (EPIC)" />

        <div className="flex justify-center mb-8">
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="bg-[#181929] text-white py-2 px-4 rounded-lg border border-[#23244a] focus:outline-none focus:border-cyan-400"
          />
        </div>

        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            msg="Loading EPIC images..."
          />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ImageGallery images={images} />
        )}
      </div>
    </div>
  );
};

export default EPICPage;
