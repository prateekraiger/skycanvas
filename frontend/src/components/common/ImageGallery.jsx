import { useState } from "react";

const ImageGallery = ({ images, onImageClick, cameraTooltips = {} }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (onImageClick) {
      onImageClick(image);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Masonry layout using CSS columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {images.map((image, index) => (
          <div
            key={image.id || index}
            className="mb-3 break-inside-avoid bg-black/60 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-[#23244a] hover:border-cyan-400 hover:shadow-[0_0_24px_#00d1ff55] transition-all duration-300 cursor-pointer group relative transform hover:scale-105"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.img_src || image.url || image.image_url}
              alt={
                image.camera?.full_name ||
                image.camera?.name ||
                `Mars Rover Image ${index}`
              }
              className="w-full object-cover max-h-72 min-h-[140px] group-hover:brightness-90 group-hover:scale-105 transition-all duration-300 rounded-xl"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all p-3 rounded-xl">
              <div className="text-white">
                <div className="font-bold text-base mb-1">
                  {image.camera?.full_name ||
                    image.camera?.name ||
                    "Unknown Camera"}
                </div>
                <div className="text-xs text-gray-200 mb-1">
                  {image.rover?.name} | Sol: {image.sol} | {image.earth_date}
                </div>
                {image.camera?.name && cameraTooltips[image.camera.name] && (
                  <div className="text-xs text-yellow-200 mt-1">
                    {cameraTooltips[image.camera.name]}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for fullsize image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-6"
          onClick={closeModal}
        >
          <div
            className="max-w-3xl w-full max-h-full relative bg-black/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-auto border border-cyan-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-700/80 transition-colors z-10 border border-cyan-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 flex items-center justify-center p-2 md:p-6 bg-black/40 rounded-l-2xl">
                <img
                  src={
                    selectedImage.img_src ||
                    selectedImage.url ||
                    selectedImage.image_url
                  }
                  alt={
                    selectedImage.camera?.full_name ||
                    selectedImage.camera?.name ||
                    "Mars Rover Image"
                  }
                  className="w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
                />
              </div>
              <div className="flex-1 p-4 md:p-8 flex flex-col gap-2 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedImage.camera?.full_name ||
                    selectedImage.camera?.name ||
                    "Mars Rover Image"}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  <span className="bg-slate-700 px-3 py-1 rounded-full">
                    Rover: {selectedImage.rover?.name}
                  </span>
                  <span className="bg-slate-700 px-3 py-1 rounded-full">
                    Sol: {selectedImage.sol}
                  </span>
                  <span className="bg-slate-700 px-3 py-1 rounded-full">
                    Earth Date: {selectedImage.earth_date}
                  </span>
                  <span className="bg-slate-700 px-3 py-1 rounded-full">
                    Camera: {selectedImage.camera?.name}
                  </span>
                </div>
                {selectedImage.camera?.name &&
                  cameraTooltips[selectedImage.camera.name] && (
                    <div className="text-yellow-200 text-sm mb-2">
                      {cameraTooltips[selectedImage.camera.name]}
                    </div>
                  )}
                {selectedImage.rover && (
                  <div className="text-gray-300 text-sm mb-2">
                    <div>Status: {selectedImage.rover.status}</div>
                    <div>Landing: {selectedImage.rover.landing_date}</div>
                    <div>Launch: {selectedImage.rover.launch_date}</div>
                  </div>
                )}
                <a
                  href={
                    selectedImage.img_src ||
                    selectedImage.url ||
                    selectedImage.image_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-cyan-700 hover:bg-cyan-800 text-white py-2 px-4 rounded transition-colors font-bold shadow border border-cyan-400"
                  download
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Image
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
