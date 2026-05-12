import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@mui/material";
import AuthContext from '../hooks/AuthContext';

function OrderDetailPage() {
  const { orderId } = useParams();
  const currentUser = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
        headers: {
          "Authorization": `Bearer ${currentUser}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Order details API endpoint not available yet. Please check with your backend developer.");
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return;
      }
      
      const data = await response.json();
      console.log('Order detail:', data);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError("Unable to load order details. The API endpoint may not be ready.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2 text-gray-500">Loading order details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <Link to="/orders" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            ← Back to Orders
          </Link>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
            <p className="text-yellow-700">{error}</p>
            <button
              onClick={fetchOrder}
              className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <Link to="/orders" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            ← Back to Orders
          </Link>
          <p className="text-gray-500 text-center py-12">Order not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link to="/orders" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
          ← Back to Orders
        </Link>
        
        <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
        <p className="text-gray-500 mt-1">Order #{order._id}</p>
        <p className="text-gray-500">Placed: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date not available'}</p>
        <p className="text-gray-500 capitalize">Status: {order.status || 'Pending'}</p>
        <p className="text-gray-500">Shipping to: {order.shippingAddress || 'Lagos, Nigeria'}</p>
        
        <div className="mt-8 flow-root">
          {!order.items || order.items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items in this order.</p>
          ) : (
            <div className="-my-6 divide-y divide-gray-200">
              {order.items.map((item, index) => {
                const product = item.product || item;
                const price = product.price || 0;
                const quantity = item.quantity || 1;
                const imageUrl = product.image || product.imageUrl;
                
                return (
                  <div key={index} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name || 'Product'}
                          className="h-full w-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/96?text=No+Image';
                          }}
                        />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name || 'Product'}</h3>
                          <p className="ml-4">${(price * quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Price: ${price.toFixed(2)}</p>
                        <p className="mt-1 text-sm text-gray-500">Quantity: {quantity}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex justify-end">
            <p className="text-lg font-bold">
              Total: ${order.totalAmount?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;