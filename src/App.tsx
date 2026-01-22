import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MarketDetailPage from './pages/MarketDetailPage';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

const AppContent = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Redirect root to home, assuming Splash handles the "Intro" info */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Main Tabs wrapped in Layout - Navigation Persistent */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my" element={<MyPage />} />
      </Route>

      {/* Stack Pages (Full Screen, Over Nav) */}
      <Route path="/market/:id" element={<MarketDetailPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {/* Global Splash Screen Overlay */}
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}

      {/* App Content - Loaded behind or after? 
          If behind, it might flash. 
          But Splash has z-index 100 and solid bg.
          Mounting content early lets it display immediately after splash.
      */}
      <div className={loading ? 'hidden' : 'block animate-fade-in'}>
        <AppContent />
      </div>

      <style>{`
          .animate-fade-in {
            animation: fadeInApp 1s ease-out;
          }
          @keyframes fadeInApp {
            from { opacity: 0; }
            to { opacity: 1; }
          }
       `}</style>
    </BrowserRouter>
  );
}

export default App;
