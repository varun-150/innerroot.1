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
const OurTeam = lazy(() => import('../pages/OurTeam'));
const SeedGenerator = lazy(() => import('../pages/SeedGenerator'));
const HeritageExplorer = lazy(() => import('../pages/HeritageExplorer'));
const Contact = lazy(() => import('../pages/Contact'));
const Monetization = lazy(() => import('../pages/Monetization'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const Community = lazy(() => import('../pages/Community'));
const Mirror = lazy(() => import('../pages/Mirror'));
const Practice = lazy(() => import('../pages/Practice'));


import { DemoOne } from '../components/ui/demo';
import DemoMatrix from '../components/ui/cyber-matrix-hero-demo';

export const routes = [
    { path: '/', element: <Home />, exact: true },
    { path: '/explore', element: <Explore /> },
    { path: '/practice', element: <Practice /> },
    { path: '/community', element: <Community /> },
    { path: '/mirror', element: <Mirror /> },
    { path: '/premium', element: <Monetization /> },
    { path: '/lesson/:id', element: <Library /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/about', element: <About /> },
    { path: '/team', element: <OurTeam /> },
    { path: '/terms', element: <Terms /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/map', element: <HeritageExplorer /> },
    { path: '*', element: <Home /> }, 
];
