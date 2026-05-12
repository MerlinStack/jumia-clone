import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UserIcon,
  ChevronDownIcon,
  XMarkIcon,
  HeartIcon,
  TruckIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [location, setLocation] = useState('Deliver to');
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!token);
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.email?.split('@')[0]);
      } catch (e) {
        console.error('Error parsing user data');
      }
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('demoCart') || '[]');
      const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    
    const handleOpenLoginModal = (event) => {
      if (event?.detail?.signUp) {
        setIsSignUpMode(true);
      } else {
        setIsSignUpMode(false);
      }
      setIsLoginModalOpen(true);
    };
    
    window.addEventListener('openLoginModal', handleOpenLoginModal);
    
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchSuggestions(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearchSuggestions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const openLoginModal = () => {
    setIsSignUpMode(false);
    setIsLoginModalOpen(true);
  };

  const openSignUpModal = () => {
    setIsSignUpMode(true);
    setIsLoginModalOpen(true);
  };

  const categories = [
    { name: 'Official Store', icon: '🏪', path: '/products?category=Official%20Store' },
    { name: 'Appliances', icon: '🔌', path: '/products?category=Appliances' },
    { name: 'Phones & Tablets', icon: '📱', path: '/products?category=Phones%20%26%20Tablets' },
    { name: 'Health & Beauty', icon: '💄', path: '/products?category=Health%20%26%20Beauty' },
    { name: 'Home & Office', icon: '🏠', path: '/products?category=Home%20%26%20Office' },
    { name: 'Electronics', icon: '💻', path: '/products?category=Electronics' },
    { name: 'Fashion', icon: '👕', path: '/products?category=Fashion' },
    { name: 'Supermarket', icon: '🛒', path: '/products?category=Supermarket' },
    { name: 'Computing', icon: '🖥️', path: '/products?category=Computing' },
    { name: 'Baby Products', icon: '🍼', path: '/products?category=Baby%20Products' },
    { name: 'Gaming', icon: '🎮', path: '/products?category=Gaming' },
    { name: 'Other categories', icon: '📦', path: '/products' }
  ];

  const searchSuggestions = {
    trending: ['iPhone 15 Pro', 'Samsung Galaxy S24', 'Gaming Laptop', 'Wireless Headphones'],
    categories: ['Phones', 'Laptops', 'Fashion', 'Home & Living'],
    recent: searchQuery ? [`${searchQuery}`] : ['Nike Air Max', 'Smart Watch']
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        {/* Top bar - Location & Delivery */}
        <div className="bg-gray-50 border-b border-gray-100 text-xs">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-8">
              {/* Left side - Location */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPinIcon className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs">{location}</span>
                  <ChevronDownIcon className="h-3 w-3" />
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1">
                  <TruckIcon className="h-3 w-3 text-yellow-500" />
                  <span className="text-gray-600">Ship to</span>
                </div>
              </div>
              
              {/* Right side - Links */}
              <div className="flex items-center gap-4 text-gray-600">
                <span className="cursor-pointer hover:text-yellow-500 transition flex items-center gap-1">
                  <PhoneIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">Live Chat</span>
                </span>
                <span className="cursor-pointer hover:text-yellow-500 transition">Track Order</span>
                <span className="cursor-pointer hover:text-yellow-500 transition hidden md:inline">Help Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="py-3 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              
              {/* Logo and Location Row */}
              <div className="flex items-center justify-between lg:justify-start gap-4">
                {/* JUMIA Logo */}
                <Link to="/" className="flex-shrink-0">
                  <div className="flex items-center">
                    <span 
                      className="text-2xl lg:text-3xl font-black tracking-wide text-gray-900"
                      style={{
                        fontFamily: "'Montserrat', 'Poppins', 'Gotham', system-ui, sans-serif",
                        fontWeight: 900,
                        letterSpacing: '0.03em'
                      }}
                    >
                      JUMIA
                    </span>
                    <span className="ml-0.5 flex items-center">
                      <svg 
                        className="w-4 h-4 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                </Link>

                {/* Mobile Location Toggle */}
                <button className="lg:hidden flex items-center gap-1 text-xs text-gray-600">
                  <MapPinIcon className="h-4 w-4 text-yellow-500" />
                  <span>Deliver to</span>
                </button>
              </div>

              {/* Search Bar - Full width on mobile */}
              <div ref={searchRef} className="flex-1">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSearchSuggestions(true);
                      }}
                      onFocus={() => setShowSearchSuggestions(true)}
                      placeholder="Search products, brands and categories..."
                      className="w-full h-11 px-4 pr-28 bg-gray-100 border-gray-200 rounded-4xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-sm transition"
                    />
                    
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      className="absolute right-1 top-1 bottom-1 px-5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-4xl hover:from-yellow-400 hover:to-yellow-900 text-sm font-medium transition shadow-sm"
                    >
                      Search
                    </button>
                  </div>

                  {/* Search Suggestions Dropdown */}
                  {showSearchSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      <div className="max-h-96 overflow-y-auto">
                        <div className="py-2">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            🔥 Trending Now
                          </div>
                          {searchSuggestions.trending.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSearchQuery(item);
                                setShowSearchSuggestions(false);
                                navigate(`/products?search=${encodeURIComponent(item)}`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition"
                            >
                              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                              <span>{item}</span>
                              <span className="text-xs text-gray-400 ml-auto">Trending</span>
                            </button>
                          ))}
                        </div>
                        <div className="border-t py-2">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            📂 Categories
                          </div>
                          {searchSuggestions.categories.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSearchQuery(item);
                                setShowSearchSuggestions(false);
                                navigate(`/products?category=${encodeURIComponent(item)}`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Icons */}
              <div className="flex items-center justify-between lg:justify-end gap-4">
                {/* Sell on Jumia - Desktop */}
                <button className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-yellow-500 transition">
                  <span className="text-lg">🏪</span>
                  <span>Sell on Jumia</span>
                </button>

                {/* Account Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      if (isLoggedIn) {
                        setShowAccountDropdown(!showAccountDropdown);
                      } else {
                        openLoginModal();
                      }
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-yellow-500 transition group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-yellow-100 transition">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-xs text-gray-500">Hello,</div>
                      <div className="text-sm font-semibold">
                        {isLoggedIn ? userName || 'Account' : 'Sign In / Sign Up'}
                      </div>
                    </div>
                    <ChevronDownIcon className="h-3 w-3 hidden lg:block" />
                  </button>
                  
                  {showAccountDropdown && isLoggedIn && (
                    <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-100 rounded-lg z-50 overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-3">
                        <p className="text-white font-semibold text-sm">Welcome back!</p>
                        <p className="text-white text-xs opacity-90">{userName || 'Customer'}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/account" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition">
                          <UserIcon className="h-4 w-4 text-gray-500" />
                          My Account
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition">
                          <TruckIcon className="h-4 w-4 text-gray-500" />
                          Orders
                        </Link>
                        <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition">
                          <HeartIcon className="h-4 w-4 text-gray-500" />
                          Wishlist
                        </Link>
                        <hr className="my-2" />
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <Link to="/cart" className="relative group">
                  <div className="flex items-center gap-2 text-gray-700 hover:text-yellow-500 transition">
                    <div className="relative">
                      <ShoppingCartIcon className="h-6 w-6" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                          {cartCount > 9 ? '9+' : cartCount}
                        </span>
                      )}
                    </div>
                    <span className="hidden lg:inline text-sm font-semibold">Cart</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar - Desktop */}
        <div className="hidden lg:block bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative">
              {/* Categories Dropdown Trigger */}
              <div 
                className="absolute left-0 top-0 bottom-0"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <button className="flex items-center gap-2 h-10 px-4 bg-yellow-500 text-white font-medium rounded-t-lg hover:bg-yellow-600 transition">
                  <span className="text-lg">☰</span>
                  <span>All Categories</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                </button>
                
                {showCategories && (
                  <div className="absolute left-0 top-full mt-0 w-64 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 overflow-hidden">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-500 transition group"
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="flex items-center justify-center gap-8 h-10 ml-32">
                {categories.slice(0, 8).map((cat) => (
                  <Link 
                    key={cat.name} 
                    to={cat.path}
                    className="text-sm text-gray-700 hover:text-yellow-500 whitespace-nowrap transition flex items-center gap-1"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Categories - Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto bg-white border-b border-gray-200">
          <div className="flex px-4 py-2 gap-4 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path} 
                className="text-gray-700 whitespace-nowrap hover:text-yellow-500 transition flex items-center gap-1"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-center py-2 text-xs font-medium">
          <span>✨ Flash Sale: Up to 70% off on selected items! ✨</span>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setIsSignUpMode(false);
        }}
        initialMode={isSignUpMode}
      />
    </>
  );
}

export default Navbar;