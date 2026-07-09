"use client";

import { useState } from "react";
import { Box } from "@mui/material";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import SearchBar from "@/components/dashboardv2/searchBar/SearchBar";

import Header from "@/components/explorePageComponents/projectSubmission/Header";
import ProjectList from "@/components/explorePageComponents/projectSubmission/ProjectList";
import UploadProject from "@/components/explorePageComponents/projectSubmission/UploadProject";

const ProjectSubmissionPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          px: { xs: 2, md: 3, lg: 5 },
          py: { xs: 3, md: 4 },
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Header />

        {/* Body */}
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
          {/* Left Section */}
          <ProjectList
            searchBar={<SearchBar onSearchClick={() => {}} />}
            searchValue={searchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />

          {/* Right Section */}
          <UploadProject />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectSubmissionPage;
