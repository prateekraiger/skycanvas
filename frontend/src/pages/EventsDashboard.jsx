import React, { useState, useEffect } from "react";
import EonetService from "../services/EonetService";
import EventCard from "../components/EventCard";
import AnimatedTitle from "../components/AnimatedTitle";
import LoadingIndicator from "../components/common/LoadingIndicator";

const EventsDashboard = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [daysFilter, setDaysFilter] = useState(30);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [selectedCategory, daysFilter]);

    const fetchCategories = async () => {
        try {
            const data = await EonetService.getCategories();
            setCategories(data.categories || []);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                status: "open",
                days: daysFilter,
                limit: 50,
            };

            if (selectedCategory !== "all") {
                params.category = selectedCategory;
            }

            const data = await EonetService.getEvents(params);
            setEvents(data.events || []);
        } catch (err) {
            setError("Failed to load events. Please try again.");
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <AnimatedTitle text1="Natural Events Tracker" />
                    <p className="text-gray-400">
                        Real-time monitoring of natural events worldwide powered by NASA EONET
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Event Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Time Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Time Range
                            </label>
                            <select
                                value={daysFilter}
                                onChange={(e) => setDaysFilter(Number(e.target.value))}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value={7}>Last 7 days</option>
                                <option value={14}>Last 14 days</option>
                                <option value={30}>Last 30 days</option>
                                <option value={60}>Last 60 days</option>
                                <option value={90}>Last 90 days</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400">
                            Showing{" "}
                            <span className="font-semibold text-white">
                                {events.length}
                            </span>{" "}
                            active events
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                <LoadingIndicator isLoading={loading} msg="Loading Events..." />


                {/* Error State */}
                {error && (
                    <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-4 mb-8">
                        <p className="text-red-200">{error}</p>
                    </div>
                )}

                {/* Events Grid */}
                {!loading && !error && (
                    <>
                        {events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-300">
                                    No events found
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try adjusting your filters to see more results.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EventsDashboard;

