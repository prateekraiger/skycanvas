import { useState } from "react";
import apiService from "../services/ApiService";
import LoadingIndicator from "../components/common/LoadingIndicator";
import AnimatedTitle from "../components/AnimatedTitle";
import SearchBtn from "../components/SearchBtn";
import AsteroidDailyCountChart from "../components/AsteroidDailyCountChart";

const today = new Date();
const todayStr = today.toISOString().split("T")[0];
const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
const weekAgoStr = weekAgo.toISOString().split("T")[0];

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d;
}

function AsteroidCard({ a }) {
  const approach = a.close_approach_data?.[0] || {};
  return (
    <div className="bg-[#181929] border border-[#23244a] rounded-xl shadow p-4 mb-4 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-cyan-200 text-lg">{a.name}</span>
        <span
          className={
            a.is_potentially_hazardous_asteroid
              ? "bg-red-700 text-red-200 px-3 py-1 rounded-full text-xs font-bold"
              : "bg-green-800 text-green-200 px-3 py-1 rounded-full text-xs font-bold"
          }
        >
          {a.is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <div className="flex-1 min-w-[120px]">
          <span className="text-cyan-400 font-semibold">Date:</span>{" "}
          {approach.close_approach_date || "-"}
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="text-cyan-400 font-semibold">Abs. Mag:</span>{" "}
          {a.absolute_magnitude_h}
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="text-cyan-400 font-semibold">Diameter (m):</span>{" "}
          {a.estimated_diameter?.meters?.estimated_diameter_min?.toFixed(1)} -{" "}
          {a.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(1)}
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="text-cyan-400 font-semibold">Miss Dist (km):</span>{" "}
          {approach.miss_distance?.kilometers
            ? Number(approach.miss_distance.kilometers).toLocaleString()
            : "-"}
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="text-cyan-400 font-semibold">Rel. Vel (km/s):</span>{" "}
          {approach.relative_velocity?.kilometers_per_second
            ? Number(approach.relative_velocity.kilometers_per_second).toFixed(
                2
              )
            : "-"}
        </div>
        <div className="flex-1 min-w-[120px]">
          <span className="text-cyan-400 font-semibold">Orbiting Body:</span>{" "}
          {approach.orbiting_body || "-"}
        </div>
      </div>
      <div className="mt-2">
        <a
          href={a.nasa_jpl_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline hover:text-cyan-200 transition-colors text-sm font-semibold"
        >
          NASA JPL Details
        </a>
      </div>
    </div>
  );
}

export default function AsteroidsPage() {
  const [startDate, setStartDate] = useState(weekAgoStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [asteroidDailyCounts, setAsteroidDailyCounts] = useState([]);

  // Calculate max end date based on start date and today
  const maxEndDate = (() => {
    const max = addDays(startDate, 6);
    return max > today ? todayStr : max.toISOString().split("T")[0];
  })();

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    // If endDate is before newStart or more than 6 days after, adjust it
    const end = new Date(endDate);
    const start = new Date(newStart);
    if (end < start || (end - start) / (1000 * 60 * 60 * 24) > 6) {
      // Set endDate to max allowed
      const newEnd = addDays(newStart, 6);
      setEndDate(
        newEnd > today ? todayStr : newEnd.toISOString().split("T")[0]
      );
    }
  };

  const handleEndDateChange = (e) => {
    const newEnd = e.target.value;
    // Only allow endDate within 6 days of startDate
    const start = new Date(startDate);
    const end = new Date(newEnd);
    if ((end - start) / (1000 * 60 * 60 * 24) > 6) {
      setError("The maximum allowed range is 7 days.");
      return;
    }
    setEndDate(newEnd);
    setError(null);
  };

  const fetchAsteroids = async (e) => {
    e.preventDefault();
    setError(null);
    // Validate range
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    if (diff < 0 || diff > 6) {
      setError("The maximum allowed range is 7 days.");
      return;
    }
    setIsLoading(true);
    setAsteroids([]);
    setAsteroidDailyCounts([]);
    try {
      const response = await apiService.getAsteroidsFeed(startDate, endDate);
      // NeoWs returns an object with near_earth_objects: { date: [asteroid, ...], ... }
      const allAsteroids = Object.values(
        response.data.near_earth_objects || {}
      ).flat();
      setAsteroids(allAsteroids);

      // Process data for daily asteroid counts chart
      const dailyCountsMap = {};
      for (const date in response.data.near_earth_objects) {
        dailyCountsMap[date] = response.data.near_earth_objects[date].length;
      }
      // Convert map to array for chart, sorted by date
      const sortedDailyCounts = Object.keys(dailyCountsMap)
        .sort()
        .map((date) => ({
          date: date,
          count: dailyCountsMap[date],
        }));
      setAsteroidDailyCounts(sortedDailyCounts);
    } catch (err) {
      setError("Failed to fetch asteroids. Please try again.");
      setAsteroidDailyCounts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <AnimatedTitle text1="Asteroids (Near Earth Objects)" />
        <form
          className="flex flex-col md:flex-row gap-4 mb-8 items-end justify-center bg-[#181929] rounded-2xl p-6 border border-[#23244a] shadow-lg"
          onSubmit={fetchAsteroids}
        >
          <div className="w-full md:w-auto">
            <label className="block text-gray-300 mb-1 font-semibold text-center">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              max={todayStr}
              onChange={handleStartDateChange}
              className="bg-[#23244a] text-cyan-200 py-2 px-3 rounded border border-[#23244a] focus:outline-none focus:border-cyan-400 w-full text-center"
              required
              style={{ colorScheme: "dark" }}
            />
          </div>
          {/* Arrow visual */}
          <div className="flex items-center justify-center h-full text-cyan-400 text-3xl mb-1 sm:mb-0 md:mb-0">
            <span className="select-none">&rarr;</span>
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-gray-300 mb-1 font-semibold text-center">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={maxEndDate}
              onChange={handleEndDateChange}
              className="bg-[#23244a] text-cyan-200 py-2 px-3 rounded border border-[#23244a] focus:outline-none focus:border-cyan-400 w-full text-center"
              required
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div className="w-full md:w-auto flex items-end">
            <SearchBtn onClick={fetchAsteroids} />
          </div>
        </form>
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        )}
        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            msg="Loading asteroids near Earth..."
          />
        ) : asteroids.length > 0 ? (
          <>
            {/* Add the daily asteroid count chart */}
            <AsteroidDailyCountChart asteroidData={asteroidDailyCounts} />

            {/* Table for md+ screens, cards for mobile */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-[#23244a] bg-[#181929] shadow-lg">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#23244a]">
                  <tr>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-left font-bold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-left font-bold uppercase tracking-wider">
                      Close Approach Date
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-right font-bold uppercase tracking-wider">
                      Abs. Magnitude
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-right font-bold uppercase tracking-wider">
                      Diameter (m)
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-right font-bold uppercase tracking-wider">
                      Miss Distance (km)
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-right font-bold uppercase tracking-wider">
                      Rel. Velocity (km/s)
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-center font-bold uppercase tracking-wider">
                      Hazardous?
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-cyan-300 text-left font-bold uppercase tracking-wider">
                      Orbiting Body
                    </th>
                    <th className="px-4 py-3 border-b border-[#23244a] text-cyan-300 text-left font-bold uppercase tracking-wider">
                      NASA JPL URL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {asteroids.map((a, i) => {
                    const approach = a.close_approach_data?.[0] || {};
                    return (
                      <tr
                        key={a.id}
                        className={
                          "transition-all duration-200 " +
                          (i % 2 === 0
                            ? "bg-black/60 hover:bg-white/10"
                            : "bg-[#23244a]/60 hover:bg-white/10")
                        }
                      >
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] font-semibold text-cyan-100">
                          {a.name}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-gray-200">
                          {approach.close_approach_date || "-"}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-gray-200 text-right">
                          {a.absolute_magnitude_h}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-gray-200 text-right">
                          {a.estimated_diameter?.meters?.estimated_diameter_min?.toFixed(
                            1
                          )}{" "}
                          -{" "}
                          {a.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(
                            1
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-gray-200 text-right">
                          {approach.miss_distance?.kilometers
                            ? Number(
                                approach.miss_distance.kilometers
                              ).toLocaleString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-gray-200 text-right">
                          {approach.relative_velocity?.kilometers_per_second
                            ? Number(
                                approach.relative_velocity.kilometers_per_second
                              ).toFixed(2)
                            : "-"}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-center">
                          <span
                            className={
                              a.is_potentially_hazardous_asteroid
                                ? "bg-red-700 text-red-200 px-3 py-1 rounded-full text-xs font-bold"
                                : "bg-green-800 text-green-200 px-3 py-1 rounded-full text-xs font-bold"
                            }
                          >
                            {a.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a] border-r border-r-[#23244a] text-gray-200">
                          {approach.orbiting_body || "-"}
                        </td>
                        <td className="px-4 py-3 border-b border-[#23244a]">
                          <a
                            href={a.nasa_jpl_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 underline hover:text-cyan-200 transition-colors"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Card layout for mobile */}
            <div className="md:hidden">
              {asteroids.map((a) => (
                <AsteroidCard key={a.id} a={a} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-center mt-8">
            No asteroids found for this date range.
          </div>
        )}
      </div>
    </div>
  );
}
