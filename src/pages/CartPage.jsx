import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      setLoading(true);
      // Load cart from localStorage
      const savedCart = localStorage.getItem('demoCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } else {
        setCartItems([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Unable to load your cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (itemId, productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => {
      const itemIdentifier = item.id || item._id || item.product?._id;
      if (itemIdentifier === itemId || itemIdentifier === productId || item.product?._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    localStorage.setItem('demoCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (itemId, productId) => {
    const confirm = window.confirm("Remove this item from your cart?");
    if (!confirm) return;

    const updatedCart = cartItems.filter(item => {
      const itemIdentifier = item.id || item._id || item.product?._id;
      return itemIdentifier !== itemId && itemIdentifier !== productId && item.product?._id !== productId;
    });
    
    setCartItems(updatedCart);
    localStorage.setItem('demoCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    const confirm = window.confirm("Remove all items from your cart?");
    if (!confirm) return;

    setCartItems([]);
    localStorage.setItem('demoCart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Proceeding to checkout (Demo mode)");
    // navigate('/checkout');
  };

  const cartSubtotal = cartItems.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
  
  const shippingFee = cartSubtotal > 50 ? 0 : 5.99;
  const tax = cartSubtotal * 0.075;
  const cartTotal = cartSubtotal + shippingFee + tax;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span className="hover:text-yellow-500 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Shopping Cart</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        
        {error && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700">{error}</p>
            <button onClick={loadCart} className="mt-2 text-yellow-600 hover:text-yellow-700 text-sm">Try again</button>
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-600">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    const product = item.product || item;
                    const price = product.price || 0;
                    const quantity = item.quantity || 1;
                    const subtotal = price * quantity;
                    const imageUrl = product.image || product.imageUrl;
                    const itemId = item.id || item._id || index;
                    const productId = product._id || product.id;
                    const productName = product.name || product.title || 'Product';
                    
                    return (
                      <div key={itemId} className="p-4 md:p-6">
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
                          {/* Product Image & Name */}
                          <div className="md:col-span-6 flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {imageUrl ? (
                                <img src={imageUrl} alt={productName} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <span className="text-2xl">📦</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800 hover:text-yellow-600">
                                <Link to={`/product/${productId}`}>{productName}</Link>
                              </h3>
                              <button
                                onClick={() => removeFromCart(itemId, productId)}
                                className="text-xs text-red-500 hover:text-red-600 mt-1"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                            <span className="font-medium text-gray-800">${price.toFixed(2)}</span>
                          </div>
                          
                          {/* Quantity */}
                          <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(itemId, productId, quantity - 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 text-center min-w-[50px]">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(itemId, productId, quantity + 1)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          {/* Subtotal */}
                          <div className="md:col-span-2 flex items-center justify-end">
                            <span className="font-bold text-yellow-600">${subtotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Continue Shopping Link */}
              <div className="mt-4">
                <Link to="/products" className="text-yellow-600 hover:text-yellow-700 flex items-center gap-1">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7.5%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  {shippingFee > 0 && (
                    <div className="text-xs text-gray-500 pt-1">
                      🚚 Add ${(50 - cartSubtotal).toFixed(2)} more for FREE shipping
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-yellow-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  className="w-full mt-6 py-3 bg-yellow-500 text-white rounded-3xl font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full mt-3 py-2 text-red-500 text-sm hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
                
                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">Secure Payment Methods</p>
                  <div className="flex justify-center gap-2 mt-2 text-2xl">
                    <span>💳</span> <span>🔒</span> <span>✅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;