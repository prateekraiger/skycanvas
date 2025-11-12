import { useState, useEffect } from 'react';
import { gibsService } from '../services/gibsService';
import AnimatedTitle from '../components/AnimatedTitle';

const GIBSPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState('VIIRS_SNPP_CorrectedReflectance_TrueColor');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState('global');

  // Region bounding boxes
  const regions = {
    global: { name: 'Global View', bbox: '-180,-90,180,90' },
    northAmerica: { name: 'North America', bbox: '-170,15,-50,75' },
    europe: { name: 'Europe', bbox: '-15,35,40,70' },
    asia: { name: 'Asia', bbox: '60,-10,150,55' },
    india: { name: 'India', bbox: '68,8,97,37' },
    australia: { name: 'Australia', bbox: '110,-45,155,-10' },
    africa: { name: 'Africa', bbox: '-20,-35,52,37' },
    southAmerica: { name: 'South America', bbox: '-82,-56,-34,13' },
  };

  // Get safe date (5 days ago)
  const getSafeDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    return date.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    // Set default date
    setDate(getSafeDate());
    
    // Fetch available products
    fetchProducts();
  }, []);

  useEffect(() => {
    // Load imagery when date, layer, or region changes
    if (date && selectedLayer) {
      loadImagery();
    }
  }, [date, selectedLayer, region]);

  const fetchProducts = async () => {
    try {
      const data = await gibsService.getProducts();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load available products');
    }
  };

  const loadImagery = async () => {
    setLoading(true);
    setError(null);

    try {
      const bbox = regions[region].bbox;
      const url = await gibsService.getMapUrl(selectedLayer, bbox, date, {
        width: 1200,
        height: 600
      });
      
      setImageUrl(url);
    } catch (err) {
      console.error('Error loading imagery:', err);
      setError('Failed to load Earth imagery');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `earth_${selectedLayer}_${date}_${region}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen p-8 text-white">
      <AnimatedTitle text1="Earth Imagery Explorer" />
      <p className="text-center text-gray-400 mb-8">
        Powered by NASA's Global Imagery Browse Services (GIBS)
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Controls Panel */}
        <div className="lg:w-1/3 bg-[#1A1C2C] p-6 rounded-lg shadow-lg border border-[#23244a]">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">📅 Date Selection</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={getMaxDate()}
              min="2000-01-01"
              className="w-full p-2 rounded-md bg-[#2D3748] text-white border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <small className="text-gray-400 text-sm mt-2 block">
              Latest available: 5 days ago
            </small>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">🛰️ Satellite Layer</h3>
            <select
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(e.target.value)}
              className="w-full p-2 rounded-md bg-[#2D3748] text-white border border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {products.map((product) => (
                <option key={product.identifier} value={product.identifier}>
                  {product.title}
                </option>
              ))}
            </select>
            {products.find(p => p.identifier === selectedLayer) && (
              <small className="text-gray-400 text-sm mt-2 block">
                {products.find(p => p.identifier === selectedLayer).description}
              </small>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">🗺️ Region</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(regions).map(([key, value]) => (
                <button
                  key={key}
                  className={`p-2 rounded-md text-white border border-[#4A5568] transition-colors duration-200 ${
                    region === key ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#2D3748] hover:bg-[#4A5568]'
                  }`}
                  onClick={() => setRegion(key)}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">⚡ Quick Dates</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setDate(getSafeDate())}
                className="flex-1 p-2 rounded-md bg-[#2D3748] text-white border border-[#4A5568] hover:bg-[#4A5568] transition-colors duration-200"
              >
                Latest Available
              </button>
              <button
                onClick={() => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  setDate(weekAgo.toISOString().split('T')[0]);
                }}
                className="flex-1 p-2 rounded-md bg-[#2D3748] text-white border border-[#4A5568] hover:bg-[#4A5568] transition-colors duration-200"
              >
                1 Week Ago
              </button>
              <button
                onClick={() => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  setDate(monthAgo.toISOString().split('T')[0]);
                }}
                className="flex-1 p-2 rounded-md bg-[#2D3748] text-white border border-[#4A5568] hover:bg-[#4A5568] transition-colors duration-200"
              >
                1 Month Ago
              </button>
            </div>
          </div>
        </div>

        {/* Imagery Display */}
        <div className="lg:w-2/3 bg-[#1A1C2C] p-6 rounded-lg shadow-lg border border-[#23244a] relative min-h-[500px] flex flex-col justify-center items-center">
          {error && (
            <div className="text-red-500 text-center p-4">
              <p>❌ {error}</p>
              <button onClick={loadImagery} className="mt-4 p-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                Retry
              </button>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-opacity-75"></div>
              <p className="mt-4">Loading Earth imagery...</p>
            </div>
          )}

          {imageUrl && !loading && (
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{regions[region].name}</h3>
                  <p className="text-gray-400">📅 {date}</p>
                  <p className="text-gray-400">
                    🛰️ {products.find(p => p.identifier === selectedLayer)?.title || selectedLayer}
                  </p>
                </div>
                <button onClick={downloadImage} className="p-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                  💾 Download
                </button>
              </div>
              
              <img
                src={imageUrl}
                alt={`Earth imagery - ${regions[region].name} - ${date}`}
                className="w-full h-auto rounded-md shadow-md flex-grow object-contain"
                onError={() => setError('Failed to load image')}
              />
              
              <div className="text-right text-gray-400 text-sm mt-2">
                <p>
                  Data courtesy: NASA GIBS / EOSDIS
                </p>
              </div>
            </div>
          )}

          {!imageUrl && !loading && !error && (
            <div className="text-gray-400 text-center">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-lg">Select date and layer to view Earth imagery</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-[#1A1C2C] p-6 rounded-lg shadow-lg border border-[#23244a]">
        <h3 className="text-2xl font-bold text-white mb-4">ℹ️ About GIBS</h3>
        <p className="text-gray-300 mb-4">
          NASA's Global Imagery Browse Services (GIBS) provides access to over 1,000 
          satellite imagery products. The imagery is updated daily, with most products 
          available within hours of satellite observation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#2D3748] p-4 rounded-md">
            <h4 className="text-lg font-bold text-white mb-2">🛰️ Satellites</h4>
            <p className="text-gray-300">VIIRS, MODIS, Landsat, and more</p>
          </div>
          <div className="bg-[#2D3748] p-4 rounded-md">
            <h4 className="text-lg font-bold text-white mb-2">🌐 Coverage</h4>
            <p className="text-gray-300">Global, full-resolution imagery</p>
          </div>
          <div className="bg-[#2D3748] p-4 rounded-md">
            <h4 className="text-lg font-bold text-white mb-2">⏱️ Updates</h4>
            <p className="text-gray-300">Daily, near real-time</p>
          </div>
          <div className="bg-[#2D3748] p-4 rounded-md">
            <h4 className="text-lg font-bold text-white mb-2">📅 History</h4>
            <p className="text-gray-300">Up to 30 years of data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GIBSPage;
