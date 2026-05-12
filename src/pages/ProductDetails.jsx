import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
      
      if (!response.ok) {
        // If API fails, use demo product data
        const demoProduct = {
          id: id,
          _id: id,
          name: `Premium Product ${id}`,
          description: "This high-quality product features premium materials and exceptional craftsmanship. Perfect for everyday use, it combines style with functionality. Backed by our satisfaction guarantee.",
          price: (Math.random() * 200 + 20).toFixed(2),
          category: "Electronics",
          rating: { rate: (Math.random() * 2 + 3).toFixed(1), count: Math.floor(Math.random() * 1000) + 100 },
          stock: Math.floor(Math.random() * 100) + 10,
          image: `https://picsum.photos/id/${(parseInt(id) % 100) + 1}/400/400`
        };
        setProductInfo(demoProduct);
        setError(null);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      setProductInfo(data);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching product:', err);
      // Fallback to demo data
      const demoProduct = {
        id: id,
        _id: id,
        name: `Product ${id}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 99.99,
        category: "General",
        rating: { rate: 4.5, count: 128 },
        stock: 50,
        image: "https://via.placeholder.com/400?text=Product"
      };
      setProductInfo(demoProduct);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const addToCart = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Open login modal instead of navigating away
      window.dispatchEvent(new CustomEvent('openLoginModal', { detail: { signUp: false } }));
      return;
    }

    setAddingToCart(true);
    
    try {
      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem('demoCart') || '[]');
      const productId = productInfo.id || productInfo._id;
      const existingItemIndex = existingCart.findIndex(
        item => (item.product?.id === productId || item.product?._id === productId)
      );
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        existingCart.push({
          id: Date.now(),
          product: productInfo,
          quantity: quantity,
          addedAt: new Date().toISOString()
        });
      }
      
      // Save back to localStorage
      localStorage.setItem('demoCart', JSON.stringify(existingCart));
      
      // Dispatch event to update cart count in navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      alert(`✓ Added ${quantity} item(s) to cart!`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Error adding to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      window.dispatchEvent(new CustomEvent('openLoginModal', { detail: { signUp: false } }));
      return;
    }
    
    addToCart();
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !productInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-600">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.floor(Math.random() * 30) + 10;
  const originalPrice = productInfo.price / (1 - discount / 100);
  const productImages = [
    productInfo.image || productInfo.imageUrl || productInfo.thumbnail,
    productInfo.image || productInfo.imageUrl || productInfo.thumbnail,
  ].filter(Boolean);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span className="hover:text-yellow-500 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">›</span>
          <span className="hover:text-yellow-500 cursor-pointer" onClick={() => navigate('/products')}>Products</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{productInfo.name?.substring(0, 50) || productInfo.title?.substring(0, 50)}</span>
        </div>

        <div className="bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Product Images */}
            <div className="lg:w-1/2 p-6">
              <div className="bg-gray-100 p-8 flex items-center justify-center min-h-[400px]">
                <img
                  src={productImages[activeImage]}
                  alt={productInfo.name || productInfo.title}
                  className="max-h-[400px] w-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400?text=Product+Image";
                  }}
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              {/* Category */}
              <p className="text-yellow-600 text-sm font-semibold mb-2 uppercase">
                {productInfo.category || 'GENERAL'}
              </p>
              
              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {productInfo.name || productInfo.title}
              </h1>
              
              {/* Rating Section */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(productInfo.rating?.rate || 4))}
                    {'☆'.repeat(5 - Math.floor(productInfo.rating?.rate || 4))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {productInfo.rating?.rate || 4.5}
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {productInfo.rating?.count || 128} ratings
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-green-600">✓ 1.2k sold</span>
              </div>
              
              {/* Price Section */}
              <div className="bg-gray-50 p-4 mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-yellow-600">
                    ${parseFloat(productInfo.price).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    -{discount}%
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">⚡ Price includes VAT</p>
              </div>
              
              {/* Delivery Info */}
              <div className="border border-gray-200 p-3 mb-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Free Delivery</span>
                  <span className="text-gray-400 text-xs">by Tomorrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">Free Returns</span>
                  <span className="text-gray-400 text-xs">within 14 days</span>
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="mb-4">
                {productInfo.stock > 10 && (
                  <span className="text-green-600 text-sm font-medium">✓ In Stock ({productInfo.stock} units)</span>
                )}
                {productInfo.stock <= 10 && productInfo.stock > 0 && (
                  <span className="text-orange-600 text-sm font-medium">⚠️ Only {productInfo.stock} left - Order soon</span>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-2xl border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors border-r"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors border-l"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={addToCart}
                  disabled={addingToCart}
                  className={`flex-1 py-3 px-6 font-semibold transition-colors rounded-3xl ${
                    addingToCart
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                >
                  {addingToCart ? 'Adding...' : '🛒 Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-6 font-semibold transition-colors rounded-3xl bg-red-500 text-white hover:bg-red-600"
                >
                  Buy Now
                </button>
              </div>
              
              {/* Product Description */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Product Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {productInfo.description || "No description available for this product."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;