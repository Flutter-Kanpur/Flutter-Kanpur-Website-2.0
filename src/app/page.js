'use client';

import Home from '@/components/Home';
import DashboardClient from './dashboard/DashboardClient';
import { useMediaQuery } from '@mui/material';
import { events, announcements } from '@/data/dashboardData';

const Page = () => {
  const isMobile = useMediaQuery('(max-width:480px)');

  return isMobile ? (
    <DashboardClient
      events={events}
      announcements={announcements}
    />
  ) : (
    <Home />
  );
};

export default Page;