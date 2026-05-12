import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function JumiaLoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ email }));
        window.dispatchEvent(new Event('cartUpdated'));
        onClose();
        window.location.reload();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white w-full max-w-md relative rounded-lg">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* JUMIA Logo */}
        <div className="text-center pt-8 pb-4">
          <span className="text-3xl font-extrabold tracking-tight text-gray-900">
            JUMIA
            <sup className="text-xs align-super ml-0.5">®</sup>
          </span>
        </div>

        {/* Welcome Text */}
        <div className="text-center px-8 mb-6">
          <p className="text-gray-600 text-sm">Welcome to Jumia</p>
          <p className="text-gray-500 text-xs mt-1">Use your email or phone to log in or sign up.</p>
        </div>

        {error && (
          <div className="mx-8 mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-8">
          <input
            type="email"
            placeholder="Email or Mobile Number*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:border-yellow-500"
            required
          />
          
          <input
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:border-yellow-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-white rounded font-medium text-sm hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Continue')}
          </button>
        </form>

        {/* Or login with */}
        <div className="px-8 mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-400">Or log in with</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button className="flex-1 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
              Facebook
            </button>
            <button className="flex-1 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
              Google
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="px-8 mt-6 text-center">
          <p className="text-xs text-gray-400">
            By continuing you agree to Jumia's 
            <a href="#" className="text-yellow-600 ml-1">Terms and Conditions</a> and 
            <a href="#" className="text-yellow-600 ml-1">Privacy Policy</a>
          </p>
        </div>

        {/* Sign Up / Sign In Toggle */}
        <div className="px-8 py-6 bg-gray-50 mt-6 text-center rounded-b">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="ml-1 text-yellow-600 font-medium hover:text-yellow-700"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Help */}
        <div className="px-8 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Need help? Visit our 
            <a href="#" className="text-yellow-600 ml-1">Help Center</a>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            or contact us on 
            <span className="text-gray-600 ml-1">02018883300, 0700-600-0000</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default JumiaLoginModal;