import { useState } from "react";
import apiService from "../services/ApiService";
import DataChart from "../components/common/DataChart";
import LoadingIndicator from "../components/common/LoadingIndicator";
import AnimatedTitle from "../components/AnimatedTitle";

const AsteroidsPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  const fetchAsteroids = async () => {
    if (!startDate || !endDate) return;
    setIsLoading(true);
    setError(null);
    setAsteroids([]);
    setChartData(null);
    try {
      const response = await apiService.getAsteroids(startDate, endDate);
      const data = response.near_earth_objects || response.data || [];
      // Flatten and sort asteroids by date
      let flat = [];
      let chartLabels = [];
      let chartCounts = [];
      if (typeof data === "object" && !Array.isArray(data)) {
        Object.keys(data).forEach((date) => {
          chartLabels.push(date);
          chartCounts.push(data[date].length);
          flat = flat.concat(data[date]);
        });
      } else if (Array.isArray(data)) {
        flat = data;
      }
      setAsteroids(flat);
      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Asteroids per Day",
            data: chartCounts,
            backgroundColor: "rgba(59, 130, 246, 0.7)",
          },
        ],
      });
    } catch (err) {
      setError("Failed to fetch asteroid data. Try another date range.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <AnimatedTitle text1="Asteroid Tracker" />
        <div className="bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl p-6 mb-8 shadow-lg flex flex-col md:flex-row gap-4 items-end border border-[#23244a] transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]">
          <div>
            <label className="block text-gray-400 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#181929] text-[#F8F9FA] py-2 px-3 rounded-full border border-[#23244a] focus:outline-none focus:border-[#00D1FF]"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#181929] text-[#F8F9FA] py-2 px-3 rounded-full border border-[#23244a] focus:outline-none focus:border-[#00D1FF]"
            />
          </div>
          <div>
            <button
              onClick={fetchAsteroids}
              className="bg-[#181929] text-white font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] hover:scale-105 hover:shadow-[0_0_16px_#00d1ff99] hover:border-cyan-400 border border-[#23244a] mt-4 md:mt-0"
            >
              Search
            </button>
          </div>
        </div>
        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            message="Loading asteroid data..."
          />
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {chartData && (
              <DataChart data={chartData} type="bar" height={300} />
            )}
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl overflow-hidden border border-[#23244a] transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-400">Name</th>
                    <th className="px-4 py-2 text-left text-gray-400">Date</th>
                    <th className="px-4 py-2 text-left text-gray-400">
                      Diameter (m)
                    </th>
                    <th className="px-4 py-2 text-left text-gray-400">
                      Hazardous
                    </th>
                    <th className="px-4 py-2 text-left text-gray-400">
                      Miss Distance (km)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {asteroids.map((a, i) => (
                    <tr key={a.id || i} className="border-b border-slate-700">
                      <td className="px-4 py-2 text-blue-400 font-medium">
                        {a.name}
                      </td>
                      <td className="px-4 py-2">
                        {a.close_approach_data?.[0]?.close_approach_date || "-"}
                      </td>
                      <td className="px-4 py-2">
                        {a.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(
                          0
                        ) || "-"}
                      </td>
                      <td className="px-4 py-2">
                        {a.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2">
                        {a.close_approach_data?.[0]?.miss_distance?.kilometers
                          ? parseFloat(
                              a.close_approach_data[0].miss_distance.kilometers
                            ).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {asteroids.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-gray-400">
                    No asteroids found for the selected range.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AsteroidsPage;
