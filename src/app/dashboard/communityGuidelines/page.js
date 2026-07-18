"use client";
import React from 'react';
import Box from "@mui/material/Box";
import CommunityGuidelines from "../../../components/dashboardv2/communityGuideline";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
export default function GuidelinesPage() {
  return (
    <Box sx={{ display: { xs: "block", md: "flex" } }}>
      <ProfileSidebar />
      <Box sx={{ flex: 1 }}>
        <CommunityGuidelines />
      </Box>
    </Box>
  );
}