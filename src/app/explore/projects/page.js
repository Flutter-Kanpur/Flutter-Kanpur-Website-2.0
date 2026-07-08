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
      }}
    >
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, md: 5 },
          py: 4,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Header />

        {/* Body */}
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: "1fr 411px",
            gap: 3,
            alignItems: "flex-start",

            "@media (max-width:1200px)": {
              gridTemplateColumns: "1fr",
            },
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
