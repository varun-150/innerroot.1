import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { HelmetProvider } from 'react-helmet-async';
import { useTheme } from './hooks/useTheme';
import { routes } from './config/routes';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MandalaBg from './components/layout/MandalaBg';
import Particles from './components/layout/Particles';
import ChatBot from './components/features/ChatBot';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [curtainState, setCurtainState] = useState('');
  const location = useLocation();

  // Reset scroll and trigger curtain on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setCurtainState('curtain-enter');
    
    const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        setCurtainState('curtain-exit');
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="relative pt-16 lg:pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </React.Suspense>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
};


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <WebSocketProvider>
              <AppContent />
            </WebSocketProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
