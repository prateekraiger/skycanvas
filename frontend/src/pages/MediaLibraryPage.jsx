import { useState } from "react";
import apiService from "../services/ApiService";
import ImageGallery from "../components/common/ImageGallery";
import LoadingIndicator from "../components/common/LoadingIndicator";
import Title from "../components/Title";

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
    <div className="min-h-screen ">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Title text1="NASA Media Library" />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">NASA Media Library</h1>
        </div>
        <form
          className="flex flex-col md:flex-row gap-4 mb-8 justify-center bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] rounded-2xl p-6 border border-[#23244a] shadow-lg transition-all duration-300 group hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_32px_#00d1ff55]"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images, videos, or keywords..."
            className="bg-[#23244a] text-[#F8F9FA] py-2 px-4 rounded border border-[#23244a] focus:outline-none focus:border-[#00D1FF] w-full md:w-96"
          />
          <button
            type="submit"
            className="bg-[#181929] text-white font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] hover:scale-105 hover:shadow-[0_0_16px_#00d1ff99] hover:border-cyan-400 border border-[#23244a]"
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
                  className="bg-[#181929] text-[#F8F9FA] px-4 py-2 rounded-full disabled:opacity-50 border border-[#23244a] transition-all duration-300 hover:bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] hover:scale-105 hover:shadow-[0_0_8px_#00d1ff99] hover:border-cyan-400"
                >
                  Previous
                </button>
                <span className="text-gray-300 px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="bg-[#181929] text-[#F8F9FA] px-4 py-2 rounded-full disabled:opacity-50 border border-[#23244a] transition-all duration-300 hover:bg-[linear-gradient(to_top_right,_rgb(7,16,45),_rgb(58,60,84))] hover:scale-105 hover:shadow-[0_0_8px_#00d1ff99] hover:border-cyan-400"
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
