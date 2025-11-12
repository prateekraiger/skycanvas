import React, { useState, useEffect } from "react";
import EonetService from "../services/EonetService";
import EventCard from "../components/EventCard";
import AnimatedTitle from "../components/AnimatedTitle";
import LoadingIndicator from "../components/common/LoadingIndicator";

const WildfiresView = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWildfires();
    }, []);

    const fetchWildfires = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await EonetService.getEvents({
                category: "wildfires",
                status: "open",
                days: 30,
                limit: 50,
            });

            setEvents(data.events || []);
        } catch (err) {
            setError("Failed to fetch wildfires. Please try again.");
            console.error("Failed to fetch wildfires:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <AnimatedTitle text1="Active Wildfires" />
                    <p className="text-gray-400">
                        Real-time tracking of wildfires worldwide (Last 30 days)
                    </p>
                </div>

                {/* Stats Card */}
                {!loading && !error && (
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-300">
                                    Active Wildfires
                                </p>
                                <p className="text-3xl font-bold text-red-500">
                                    {events.length}
                                </p>
                            </div>
                            <div className="p-3 bg-red-900 bg-opacity-50 rounded-full">
                                <svg
                                    className="w-8 h-8 text-red-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                <LoadingIndicator isLoading={loading} msg="Loading Wildfires..." />

                {/* Error State */}
                {error && (
                    <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-4 mb-8">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-red-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-red-200">{error}</p>
                        </div>
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
                            <div className="text-center py-12 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg">
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
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-300">
                                    No active wildfires
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    There are currently no reported wildfires in the last 30 days.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default WildfiresView;
