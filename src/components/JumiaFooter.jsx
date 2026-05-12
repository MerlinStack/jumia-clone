import React from 'react';
import { Link } from 'react-router-dom';

// Simple SVG Icon Components to keep code clean
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.1979 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80212 13.4901H9.19795V21.5Z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10.03 2.38 10.07C2.38 12.11 3.83 13.82 5.74 14.2C5.39 14.3 5.02 14.35 4.64 14.35C4.36 14.35 4.09 14.32 3.82 14.27C4.37 15.97 5.95 17.22 7.82 17.25C6.36 18.39 4.5 19.06 2.5 19.06C2.15 19.06 1.8 19.04 1.46 18.99C3.33 20.2 5.58 20.9 8 20.9C15.8 20.9 20.07 14.42 20.07 8.79C20.07 8.6 20.07 8.42 20.06 8.23C20.91 7.63 21.64 6.87 22.46 6Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2A5.8 5.8 0 0 1 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2ZM7.6 4A3.6 3.6 0 0 0 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4A3.6 3.6 0 0 0 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5A1.25 1.25 0 1 1 17.25 8A1.25 1.25 0 0 1 17.25 5.5ZM12 7A5 5 0 1 1 12 17A5 5 0 0 1 12 7ZM12 9A3 3 0 1 0 12 15A3 3 0 0 0 12 9Z" />
  </svg>
);

function JumiaFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
          
          {/* Column 1 - NEED HELP? */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">NEED HELP?</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/contact" className="hover:text-yellow-600">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-600">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-yellow-600">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-yellow-600">Returns Policy</Link></li>
              <li><Link to="/payment" className="hover:text-yellow-600">Payment Options</Link></li>
            </ul>
          </div>

          {/* Column 2 - ABOUT JUMIA */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">ABOUT JUMIA</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about" className="hover:text-yellow-600">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-yellow-600">Careers</Link></li>
              <li><Link to="/press" className="hover:text-yellow-600">Press</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-600">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-yellow-600">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 - MAKE MONEY WITH US */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">MAKE MONEY WITH US</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/sell" className="hover:text-yellow-600">Sell on Jumia</Link></li>
              <li><Link to="/affiliate" className="hover:text-yellow-600">Affiliate Program</Link></li>
              <li><Link to="/advertise" className="hover:text-yellow-600">Advertise Your Products</Link></li>
            </ul>
          </div>

          {/* Column 4 - JUMIA INTERNATIONAL */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">JUMIA INTERNATIONAL</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-yellow-600">Nigeria</a></li>
              <li><a href="#" className="hover:text-yellow-600">Kenya</a></li>
              <li><a href="#" className="hover:text-yellow-600">Egypt</a></li>
              <li><a href="#" className="hover:text-yellow-600">Morocco</a></li>
            </ul>
          </div>

          {/* Column 5 - CONNECT WITH US */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">CONNECT WITH US</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <InstagramIcon />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Download App</p>
              <div className="flex gap-2 mt-2">
                <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded cursor-pointer">App Store</div>
                <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded cursor-pointer">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>© 2024 Jumia. All rights reserved. | CALL TO ORDER: 02188833300, 0700-600-0000</p>
        </div>
      </div>
    </footer>
  );
}

export default JumiaFooter;