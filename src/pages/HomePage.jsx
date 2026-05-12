import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 42, seconds: 52 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await response.json();
      setFeaturedProducts(data.slice(0, 8));
      setFlashSales(data.slice(0, 6));
      setTopSellers(data.slice(6, 12));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const categories = [
    { name: 'Phones & Tablets', icon: '📱', bg: 'bg-blue-100', color: 'text-blue-600' },
    { name: 'Appliances', icon: '🔧', bg: 'bg-green-100', color: 'text-green-600' },
    { name: 'Fashion', icon: '👕', bg: 'bg-pink-100', color: 'text-pink-600' },
    { name: 'Beauty Must Have', icon: '💄', bg: 'bg-purple-100', color: 'text-purple-600' },
    { name: 'TV & Audio', icon: '📺', bg: 'bg-red-100', color: 'text-red-600' },
    { name: 'Sneakers', icon: '👟', bg: 'bg-orange-100', color: 'text-orange-600' },
    { name: 'New Arrival', icon: '✨', bg: 'bg-yellow-100', color: 'text-yellow-600' },
    { name: 'Mobile Accessories', icon: '🔌', bg: 'bg-indigo-100', color: 'text-indigo-600' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        
        {/* Hero Banner with Discount */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 mb-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Daily Discount</div>
              <div className="text-3xl font-bold">UP TO 40% OFF</div>
              <button className="mt-3 px-6 py-2 bg-white text-yellow-600 rounded font-medium text-sm hover:bg-gray-100">
                APPLY NOW
              </button>
            </div>
            <div className="text-right">
              <div className="text-xs">Limited Stock deals</div>
              <div className="text-xl font-bold">Up to 65% Off</div>
            </div>
          </div>
        </div>

        {/* Flash Sales Section - Jumia Style */}
        <div className="bg-white rounded-lg mb-6 overflow-hidden shadow-sm">
          <div className="bg-red-500 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">⚡ FLASH SALES</span>
              <div className="flex items-center gap-1 text-sm">
                <span>Time Left:</span>
                <span className="bg-black px-2 py-1 rounded font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
            <button onClick={() => navigate('/products')} className="text-sm underline">View All →</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-200">
            {flashSales.map((product, idx) => (
              <div
                key={product._id || idx}
                onClick={() => navigate(`/product/${product._id}`)}
                className="p-4 text-center cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="bg-gray-100 rounded-lg p-3 mb-2 flex justify-center">
                  {product.image || product.imageUrl ? (
                    <img src={product.image || product.imageUrl} alt={product.name} className="h-24 object-contain" />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                <p className="text-yellow-600 font-bold mt-1">₱ {product.price?.toFixed(0)}</p>
                <p className="text-xs text-gray-400 line-through">₱ {(product.price * 1.47).toFixed(0)}</p>
                <p className="text-xs text-red-500 mt-1">-47%</p>
                <p className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 50) + 20} items left</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white rounded-lg p-3 text-center cursor-pointer hover:shadow-md transition">
              <div className={`${cat.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <p className="text-xs text-gray-700 font-medium">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Popular Picks Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="text-sm">Popular Picks</div>
            <div className="text-2xl font-bold">Up to 70% Off</div>
            <div className="text-xs">Kids, Baby And More</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="text-sm">Top Picks For You</div>
            <div className="text-2xl font-bold">Up to 50% Off</div>
            <div className="text-xs">Call for deals</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-sm">Limited Stock</div>
            <div className="text-2xl font-bold">Up to 65% Off</div>
            <div className="text-xs">Unlock Your Deal</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="text-sm">JUMIA FORCE</div>
            <div className="text-lg font-bold">BUY 2 PAY FOR 1</div>
            <button className="mt-2 text-xs bg-white text-orange-600 px-3 py-1 rounded">SHOP NOW →</button>
          </div>
        </div>

        {/* Top Sellers Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 px-4 py-3">
            <h2 className="text-lg font-bold text-gray-800">Top Sellers</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {topSellers.map((product, idx) => (
              <div
                key={product._id || idx}
                onClick={() => navigate(`/product/${product._id}`)}
                className="cursor-pointer group"
              >
                <div className="bg-gray-50 rounded-lg p-3 mb-2 flex justify-center h-32">
                  {product.image || product.imageUrl ? (
                    <img src={product.image || product.imageUrl} alt={product.name} className="h-full object-contain group-hover:scale-105 transition" />
                  ) : (
                    <span className="text-4xl flex items-center">📦</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 h-10">{product.name}</p>
                <p className="text-yellow-600 font-bold mt-1">₱ {product.price?.toFixed(0)}</p>
                <p className="text-xs text-gray-400 line-through">₱ {(product.price * 1.08).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Products */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 px-4 py-3">
            <h2 className="text-lg font-bold text-gray-800">Sponsored products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {featuredProducts.slice(0, 6).map((product, idx) => (
              <div
                key={product._id || idx}
                onClick={() => navigate(`/product/${product._id}`)}
                className="cursor-pointer group"
              >
                <div className="bg-gray-50 rounded-lg p-3 mb-2 flex justify-center h-32">
                  {product.image || product.imageUrl ? (
                    <img src={product.image || product.imageUrl} alt={product.name} className="h-full object-contain" />
                  ) : (
                    <span className="text-4xl flex items-center">📦</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 h-10">{product.name}</p>
                <p className="text-yellow-600 font-bold">₱ {product.price?.toFixed(0)}</p>
                <p className="text-xs text-gray-400 line-through">₱ {(product.price * 1.35).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Shop Banners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-bold">Phones & Tablets</h3>
            <p className="text-sm text-gray-500">Stay connected. Stay ahead.</p>
            <button className="mt-2 text-yellow-600 text-sm">Shop Now →</button>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="font-bold">Appliances</h3>
            <p className="text-sm text-gray-500">Smarter Living. Better Every Day.</p>
            <button className="mt-2 text-yellow-600 text-sm">Shop Now →</button>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">👕</div>
            <h3 className="font-bold">Fashion</h3>
            <p className="text-sm text-gray-500">Your Style. Your Statement.</p>
            <button className="mt-2 text-yellow-600 text-sm">Shop Now →</button>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">💄</div>
            <h3 className="font-bold">Beauty Must Have</h3>
            <p className="text-sm text-gray-500">Trendy Essentials</p>
            <button className="mt-2 text-yellow-600 text-sm">Shop Now →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;