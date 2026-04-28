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

import { DemoOne } from '../components/ui/demo';
import DemoMatrix from '../components/ui/cyber-matrix-hero-demo';

export const routes = [
    { path: '/demo/hero', element: <DemoOne /> },
    { path: '/demo/matrix', element: <DemoMatrix /> },

    { path: '/', element: <LandingPage />, exact: true },
    { path: '/v1', element: <Home /> },
    { path: '/explore', element: <Explore /> },
    { path: '/tours', element: <Tours /> },
    { path: '/wellness', element: <Wellness /> },
    { path: '/heritage-map', element: <HeritageExplorer /> },
    { path: '/library', element: <Library /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <Terms /> },
    { path: '/monetization', element: <Monetization /> },
    { path: '/setup-2fa', element: <TwoFactorSetup /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/tools/sql-seed-generator', element: <SeedGenerator /> },
    { path: '*', element: <LandingPage /> }, // Fallback route
];
