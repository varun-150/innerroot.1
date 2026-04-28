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
import ChatBot from './components/features/ChatBot';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="relative min-h-screen">
        <React.Suspense fallback={<div className="min-h-screen bg-brand-black flex items-center justify-center text-white">Loading...</div>}>
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
