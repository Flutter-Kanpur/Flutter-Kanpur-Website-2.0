"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import MobileTopBar from "@/components/profile/MobileTopBar";
import MobileLayout from "@/components/layouts/MobileLayout";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import SearchBar from "@/components/dashboardv2/searchBar/SearchBar";

import Header from "@/components/explorePageComponents/desktopScreen/projectSubmission/Header";
import ProjectList from "@/components/explorePageComponents/desktopScreen/projectSubmission/ProjectList";
import UploadProject from "@/components/explorePageComponents/desktopScreen/projectSubmission/UploadProject";
import YourProjectsScreen from "@/components/explorePageComponents/mobileScreen/projects/YourProjectsScreen";

const ProjectSubmissionPage = () => {
  const isMobile = useMediaQuery("(max-width:480px)");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  if (isMobile) {
    return <YourProjectsScreen />;
  }

  return (
    <>
      <ScreenUtilScaler>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            background: "#FAFAFA",
            minHeight: "100vh",
          }}
        >
          <Header
            activeFilter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />

          <ProjectList filter={filter} search={search} />

          <UploadProject />
        </Box>
      </ScreenUtilScaler>

      <MobileLayout>
        <MobileTopBar title="Projects" />

        <Box sx={{ mt: 3, mb: 2 }}>
          <SearchBar />
        </Box>

        <ProjectList isMobile />
      </MobileLayout>
    </>
  );
};

export default ProjectSubmissionPage;
