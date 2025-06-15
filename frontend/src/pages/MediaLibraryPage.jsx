import { useState } from "react";
import apiService from "../services/ApiService";
import ImageGallery from "../components/common/ImageGallery";
import LoadingIndicator from "../components/common/LoadingIndicator";
import AnimatedTitle from "../components/AnimatedTitle";
import SearchBtn from "../components/SearchBtn";
import SearchBar from "../components/SearchBar";

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
        <AnimatedTitle text1="NASA Media Library" />
        <form
          className="flex flex-col md:flex-row gap-4 mb-8 justify-center bg-[#181929]/70 rounded-2xl p-6 border border-[#23244a] shadow-lg transition-all duration-300 group hover:bg-[#181929]"
          onSubmit={handleSearch}
        >
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Explore NASA's vast media collection..."
          />
          <SearchBtn onClick={handleSearch} />
        </form>

        {/* Sample Prompts */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["galaxy", "nebula", "planet", "rover", "ISS", "astronaut"].map(
            (prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setQuery(prompt);
                  handleSearch({ preventDefault: () => {} });
                }}
                className="bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-cyan-700 hover:text-white transition-colors duration-200 border border-[#23244a]"
              >
                {prompt}
              </button>
            )
          )}
        </div>

        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            msg="Loading data from NASA..."
          />
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {results.length === 0 ? (
              <div className="text-center text-gray-400 py-10 rounded-xl bg-[#181929]/50 border border-[#23244a] shadow-lg">
                <p className="text-lg font-semibold mb-2">
                  No media found for your search.
                </p>
                <p className="text-sm">
                  Try searching for anything related to NASA missions, space,
                  planets, or specific events!
                </p>
                <p className="text-sm mt-1">
                  You can also use the sample prompts above.
                </p>
              </div>
            ) : (
              <ImageGallery images={results} />
            )}
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
