import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Homepage from './pages/Homepage';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
          {/* Redirect /login and /register to home page (modal will handle them) */}
          <Route path="login" element={<Navigate to="/" replace />} />
          <Route path="register" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;