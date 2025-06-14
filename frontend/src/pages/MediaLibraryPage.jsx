import { useState } from "react";
import apiService from "../services/ApiService";
import ImageGallery from "../components/common/ImageGallery";
import LoadingIndicator from "../components/common/LoadingIndicator";

const MediaLibraryPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setResults([]);
    try {
      const response = await apiService.searchMediaLibrary(query, page);
      // NASA API returns items in response.collection.items
      const items = response.collection?.items || response.data?.items || [];
      setResults(
        items.map((item) => {
          // Try to extract image/video URL and metadata
          const links = item.links || [];
          const image = links.find((l) => l.render === "image");
          return {
            url: image?.href,
            title: item.data?.[0]?.title || "",
            date: item.data?.[0]?.date_created || "",
            description: item.data?.[0]?.description || "",
          };
        })
      );
      // NASA API provides total hits in response.collection.metadata.total_hits
      const totalHits = response.collection?.metadata?.total_hits || 0;
      setTotalPages(Math.ceil(totalHits / 100)); // NASA API returns 100 per page
    } catch (err) {
      setError("Failed to fetch media results. Try another search.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSearch({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">NASA Media Library</h1>
          <p className="text-gray-300 mt-2">
            Search NASA's vast collection of images and videos. Enter a keyword
            to begin.
          </p>
        </div>
        <form
          className="flex flex-col md:flex-row gap-4 mb-8 justify-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images, videos, or keywords..."
            className="bg-slate-700 text-white py-2 px-4 rounded border border-slate-600 focus:outline-none focus:border-blue-500 w-full md:w-96"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Search
          </button>
        </form>
        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            message="Loading media results..."
          />
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <ImageGallery images={results} />
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-300 px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MediaLibraryPage;
