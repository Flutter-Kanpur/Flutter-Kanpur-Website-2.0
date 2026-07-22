"use client";

import { useState } from "react";
import { Box } from "@mui/material";

import MobileTopBar from "@/components/profile/MobileTopBar";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import SearchBar from "@/components/dashboardv2/searchBar/SearchBar";

import Header from "@/components/explorePageComponents/projectSubmission/Header";
import ProjectList from "@/components/explorePageComponents/projectSubmission/ProjectList";
import UploadProject from "@/components/explorePageComponents/projectSubmission/UploadProject";

const ProjectSubmissionPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  return (
    <ScreenUtilScaler designWidth={1600} desktopMin={1200}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          overflowX: "hidden",
          px: { xs: 2, md: 3, lg: 5 },
          py: { xs: 3, md: 4 },
        }}
      >
        <MobileTopBar />

        <Header />

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "flex-start",
            gap: { xs: 3, lg: 3 },
            width: "100%",
          }}
        >
          <ProjectList
            searchBar={<SearchBar onSearchClick={() => {}} />}
            searchValue={searchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />

          <UploadProject />
        </Box>
      </Box>
    </ScreenUtilScaler>
  );
};

export default ProjectSubmissionPage;
