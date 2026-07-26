"use client";

import Box from "@mui/material/Box";
import CommunityGuidelines from "@/components/dashboardv2/communityGuideline";
import MobileTopBar from "@/components/profile/MobileTopBar";

export default function GuidelinesPage() {
  return (
    <Box sx={{ width: "100%", minHeight: "100%" }}>
      <Box sx={{ px: { xs: 2, md: 0 }, pt: { xs: 2, md: 0 } }}>
        <MobileTopBar />
      </Box>
      <CommunityGuidelines />
    </Box>
  );
}
