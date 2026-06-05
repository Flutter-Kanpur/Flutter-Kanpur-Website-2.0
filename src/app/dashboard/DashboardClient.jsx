'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dashboard from '@/components/dashboardv2/dashboard';
import SearchScreen from '@/components/dashboardv2/searchScreen/SearchScreen';
import BottomNavBar from '@/components/dashboardv2/bottomNavBar/BottomNavBar';
import GradientHeader from "@/components/header/GradientHeader";

const DashboardClient = ({ events = [], announcements = [] }) => {
    
    const [activeScreen, setActiveScreen] = useState('dashboard');

    // Search screen is a full overlay — no bottom nav
    if (activeScreen === 'search') {
        return (
             <>
        
            <SearchScreen
                events={events}
                onBack={() => setActiveScreen('dashboard')}
            />
             </>
        );
    }

    return (
  <Box
    sx={{
      position: "relative",
      minHeight: "100vh",
    }}
  >
    

    <Dashboard
      events={events}
      announcements={announcements}
      onSearchClick={() => setActiveScreen("search")}
    />

    <BottomNavBar />
  </Box>
);
};

export default DashboardClient;
