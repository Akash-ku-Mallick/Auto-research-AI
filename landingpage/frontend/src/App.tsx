import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { LandingLayout } from './components/LandingLayout';
import { LandingPage } from './pages/LandingPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { PricingPage } from './pages/PricingPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { WaitlistPage } from './pages/WaitlistPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'playground',
        element: <PlaygroundPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'architecture',
        element: <ArchitecturePage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'waitlist',
        element: <WaitlistPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
