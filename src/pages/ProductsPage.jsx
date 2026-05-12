import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../hooks/AuthContext';
import ModalComponent from '../components/ModalComponent';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [modal, setModal] = useState({ open: false, info: "" });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('popular');
  const [searchParams] = useSearchParams();
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  // Get quantity for a product (default to 1)
  const getQty = (id) => quantities[id] || 1;

  const increase = (id) => {
    setQuantities(prev => ({ ...prev, [id]: getQty(id) + 1 }));
  };

  const decrease = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, getQty(id) - 1) }));
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      const product = products.find(p => p._id === productId);
      setSelectedProduct(product);
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productId,
          quantity: getQty(productId)
        })
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setShowAuthModal(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      setModal({ open: true, info: "Item added to cart successfully!" });
      setQuantities(prev => ({ ...prev, [productId]: 1 }));
      window.dispatchEvent(new Event('cartUpdated'));
      
      setTimeout(() => {
        setModal({ open: false, info: "" });
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setModal({ open: true, info: "Error adding to cart" });
      setTimeout(() => setModal({ open: false, info: "" }), 3000);
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category || 'Uncategorized').filter(Boolean))];

  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = (product.price || 0) >= priceRange.min && (product.price || 0) <= priceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
    return 0; // popular - default
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="hover:text-yellow-500 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Filters - Jumia Style */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </label>
                ))}
              </div>

              <hr className="my-4" />

              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>

              <hr className="my-4" />

              <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-yellow-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Products Grid - Jumia Style Cards */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                  className="mt-4 text-yellow-600 hover:text-yellow-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => {
                  const discount = Math.floor(Math.random() * 30) + 10; // Random discount 10-40%
                  const originalPrice = product.price / (1 - discount / 100);
                  
                  return (
                    <div 
                      key={product._id} 
                      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => handleViewProduct(product._id)}
                    >
                      {/* Image Container */}
                      <div className="relative bg-gray-100 p-4 flex items-center justify-center h-48">
                        {(product.image || product.imageUrl) ? (
                          <img
                            src={product.image || product.imageUrl}
                            alt={product.name}
                            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="text-6xl">📦</div>
                        )}
                        
                        {/* Discount Badge */}
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discount}%
                        </span>
                        
                        {/* Quick View Button */}
                        <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-sm px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                          Quick View
                        </button>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-3">
                        {/* Brand/Category */}
                        <p className="text-xs text-gray-400 uppercase mb-1">{product.category || 'GENERAL'}</p>
                        
                        {/* Name */}
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-yellow-600">
                          {product.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 text-xs">
                            {'★'.repeat(Math.floor(product.rating?.rate || 4))}
                            {'☆'.repeat(5 - Math.floor(product.rating?.rate || 4))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({product.rating?.count || 128})</span>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-lg font-bold text-yellow-600">
                            ${product.price?.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Free Shipping Badge */}
                        <div className="text-xs text-green-600 mb-2">
                          🚚 Free Shipping
                        </div>
                        
                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-lg">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decrease(product._id);
                              }}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 font-bold"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{getQty(product._id)}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                increase(product._id);
                              }}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 font-bold"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product._id);
                            }}
                            className="bg-yellow-500 text-white px-3 py-2.5 rounded-3xl text-sm font-medium hover:bg-yellow-600 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white rounded-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to continue</h3>
              <p className="text-gray-600">
                Please sign in to add "{selectedProduct?.name?.substring(0, 40)}..." to your cart
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full border border-yellow-500 text-yellow-600 py-2 rounded-lg hover:bg-yellow-50 transition-colors font-medium"
              >
                Create New Account
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors text-sm"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ModalComponent open={modal.open} handleClose={closeModal} info={modal.info} />
    </div>
  );
}

export default ProductsPage;