import React, { useState, useEffect } from 'react';
import { XMarkIcon, EnvelopeIcon, LockClosedIcon, UserIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function LoginModal({ isOpen, onClose, initialMode = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsSignUp(initialMode);
      setEmail('');
      setPassword('');
      setName('');
      setError('');
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  // Check for saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (isSignUp && name && name.length < 2) {
      setError("Please enter a valid name");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoToken = 'demo-token-' + Date.now();
      const userData = { 
        email, 
        name: name || email.split('@')[0],
        email_verified: true,
        member_since: new Date().toISOString()
      };
      
      localStorage.setItem("token", demoToken);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      window.dispatchEvent(new Event('cartUpdated'));
      window.dispatchEvent(new CustomEvent('openLoginModal', { detail: { success: true } }));
      onClose();
      window.location.reload();
      
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md relative rounded-lg shadow-xl overflow-hidden">
        
        {/* Header with Jumia colors */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-1"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10 transition-colors duration-200"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* JUMIA Logo - Same as navbar */}
        <div className="text-center pt-8 pb-2">
          <div className="flex items-center justify-center">
            <span 
              className="text-3xl font-black tracking-wide text-gray-900"
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
          <p className="text-xs text-gray-500 mt-2">Africa's Largest Online Retailer</p>
        </div>

        {/* Welcome Text */}
        <div className="text-center px-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isSignUp ? 'Create Account' : 'Welcome Back!'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isSignUp 
              ? 'Sign up to enjoy exclusive deals and offers' 
              : 'Log in to access your account and orders'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-600 text-xs">
            <span className="font-medium">Error: </span>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8">
          {isSignUp && (
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
              />
            </div>
          )}
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
              required
            />
          </div>
          
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Remember me and Forgot password */}
          {!isSignUp && (
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset link would be sent to your email")}
                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold text-sm hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (isSignUp ? 'Create Account' : 'Login')}
          </button>
        </form>

        {/* Social Login (Only for Login mode) */}
        {!isSignUp && (
          <div className="px-8 mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-yellow-500 transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-yellow-500 transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#DB4437" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                Google
              </button>
            </div>
          </div>
        )}

        {/* Terms for Sign Up */}
        {isSignUp && (
          <div className="px-8 mt-6 text-center">
            <p className="text-xs text-gray-400">
              By creating an account, you agree to Jumia's 
              <a href="#" className="text-yellow-600 hover:text-yellow-700 ml-1">Terms & Conditions</a> and 
              <a href="#" className="text-yellow-600 hover:text-yellow-700 ml-1">Privacy Policy</a>
            </p>
          </div>
        )}

        {/* Switch between Login/Signup */}
        <div className="px-8 py-5 bg-gray-50 mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setName('');
                setPassword('');
              }}
              className="ml-2 text-yellow-600 font-semibold hover:text-yellow-700 transition"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>

        {/* Help Footer */}
        <div className="px-8 py-4 text-center border-t border-gray-100 bg-white">
          <p className="text-xs text-gray-400">
            Need assistance? Visit our 
            <a href="#" className="text-yellow-600 hover:text-yellow-700 ml-1">Help Center</a>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Call us: 
            <span className="text-gray-600 ml-1">02018883300, 0700-600-0000</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;