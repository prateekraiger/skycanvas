import React from "react";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      wildfires: "bg-red-500",
      volcanoes: "bg-orange-500",
      severeStorms: "bg-blue-500",
      floods: "bg-cyan-500",
      earthquakes: "bg-yellow-500",
      drought: "bg-amber-500",
      landslides: "bg-stone-500",
      seaLakeIce: "bg-teal-500",
      dustHaze: "bg-slate-400",
      snow: "bg-indigo-400",
      waterColor: "bg-blue-400",
      tempExtremes: "bg-rose-500",
      default: "bg-gray-500",
    };
    return colors[categoryId] || colors.default;
  };

  const getLatestGeometry = () => {
    if (!event.geometry || event.geometry.length === 0) return null;
    return event.geometry[event.geometry.length - 1];
  };

  const geometry = getLatestGeometry();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Category Badge */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <h3 className="font-semibold text-gray-700 text-sm">
          {event.categories[0]?.title || "Event"}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(event.categories[0]?.id)}`}
        >
          {event.categories[0]?.id}
        </span>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          {/* Date */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formatDate(event.geometry[0]?.date)}</span>
          </div>

          {/* Location */}
          {geometry && (
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {geometry.coordinates[1].toFixed(2)}°,{" "}
                {geometry.coordinates[0].toFixed(2)}°
              </span>
            </div>
          )}

          {/* Source */}
          {event.sources && event.sources.length > 0 && (
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{event.sources[0].id}</span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        {event.sources && event.sources[0]?.url && (
          <a
            href={event.sources[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View Details
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
