import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@mui/material";
import AuthContext from '../hooks/AuthContext';

function OrdersPage() {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        headers: {
          "Authorization": `Bearer ${currentUser}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Orders API endpoint not available yet. Please check with your backend developer.");
          setOrders([]);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return;
      }
      
      const data = await response.json();
      console.log('Orders data:', data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError("Unable to load orders. The API endpoint may not be ready.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Orders</h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2 text-gray-500">Loading orders...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Orders</h2>
        
        {error && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-700">{error}</p>
            <button
              onClick={fetchOrders}
              className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm"
            >
              Try again
            </button>
          </div>
        )}
        
        {!error && orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
            <Link
              to="/products"
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
        
        {!error && orders.length > 0 && (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-md p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <p className="font-medium text-gray-900">Order #{order._id?.slice(-8) || 'N/A'}</p>
                  <p className="text-sm text-gray-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Date not available'}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">Status: {order.status || 'Pending'}</p>
                  <p className="text-sm font-medium mt-1">
                    Total: ${order.totalAmount?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <Link to={`/orders/${order._id}`}>
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;