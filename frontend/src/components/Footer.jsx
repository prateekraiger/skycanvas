const Footer = () => (
  <footer className="bg-black/40 py-6 backdrop-blur-md">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-400 text-sm">
            SkyCanvas - Exploring NASA's APIs
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Powered by NASA's Open APIs
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <i className="fas fa-globe"></i>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
