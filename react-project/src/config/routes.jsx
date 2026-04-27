import React, { lazy } from 'react';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('../pages/LandingPage'));
const Home = lazy(() => import('../pages/Home'));
const Explore = lazy(() => import('../pages/Explore'));
const Tours = lazy(() => import('../pages/Tours'));
const Wellness = lazy(() => import('../pages/Wellness'));
const Library = lazy(() => import('../pages/Library'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/auth/Login'));
const Signup = lazy(() => import('../pages/auth/Signup'));
const TwoFactorSetup = lazy(() => import('../pages/auth/TwoFactorSetup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Terms = lazy(() => import('../pages/Terms'));
const SeedGenerator = lazy(() => import('../pages/SeedGenerator'));
const HeritageExplorer = lazy(() => import('../pages/HeritageExplorer'));
const Contact = lazy(() => import('../pages/Contact'));
const Monetization = lazy(() => import('../pages/Monetization'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminRoute from '../components/auth/AdminRoute';

import { DemoOne } from '../components/ui/demo';
import DemoMatrix from '../components/ui/cyber-matrix-hero-demo';

export const routes = [
    { path: '/demo/hero', element: <ProtectedRoute><DemoOne /></ProtectedRoute> },
    { path: '/demo/matrix', element: <ProtectedRoute><DemoMatrix /></ProtectedRoute> },

    { path: '/', element: <LandingPage />, exact: true },
    { path: '/v1', element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: '/explore', element: <ProtectedRoute><Explore /></ProtectedRoute> },
    { path: '/tours', element: <ProtectedRoute><Tours /></ProtectedRoute> },
    { path: '/wellness', element: <ProtectedRoute><Wellness /></ProtectedRoute> },
    { path: '/heritage-map', element: <ProtectedRoute><HeritageExplorer /></ProtectedRoute> },
    { path: '/library', element: <ProtectedRoute><Library /></ProtectedRoute> },
    { path: '/about', element: <ProtectedRoute><About /></ProtectedRoute> },
    { path: '/contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <Terms /> },
    { path: '/monetization', element: <ProtectedRoute><Monetization /></ProtectedRoute> },
    { path: '/setup-2fa', element: <ProtectedRoute><TwoFactorSetup /></ProtectedRoute> },
    { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/admin', element: <AdminRoute><AdminDashboard /></AdminRoute> },
    { path: '/tools/sql-seed-generator', element: <ProtectedRoute><SeedGenerator /></ProtectedRoute> },
    { path: '*', element: <LandingPage /> }, // Fallback route
];
