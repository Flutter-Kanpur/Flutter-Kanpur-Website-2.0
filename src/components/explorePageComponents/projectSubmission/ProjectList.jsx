"use client";

import { Box, Typography } from "@mui/material";

import FilterTabs from "./FilterTabs";
import ProjectCard from "./ProjectCard";
import SearchBar from "@/components/dashboardv2/searchBar/SearchBar";
import {
  projectSubmissions,
  projectSubmissionsContent,
} from "@/data/projectSubmissionsData";

export default function ProjectList({
  searchBar,
  searchValue = "",
  selectedFilter = null,
  setSelectedFilter,
  projects = projectSubmissions,
}) {
  const query = searchValue.trim().toLowerCase();

  const visibleProjects = projects.filter((project) => {
    const matchesFilter = !selectedFilter || project.status === selectedFilter;
    const matchesSearch = !query || project.name.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <Box>
      {/* Title + search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: "26px",
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 600, color: "#1A1A1A" }}>
          {projectSubmissionsContent.listTitle}
        </Typography>

        <Box
          sx={{
            width: { xs: "100%", sm: "320px" },
            "& > div": {
              height: "44px",
              borderRadius: "22px",
              boxShadow:
                "inset 0 0 8px rgba(35,115,226,0.12), 0 0 6px rgba(35,115,226,0.12)",
            },
          }}
        >
          <SearchBar
          placeholder="Search project..."
            onSearchClick={() => {}}
            sx={{
              width: "290px",
              height: "33.21px",
              "& .MuiOutlinedInput-root": {
                height: "33.21px",
                borderRadius: "999px",
              },
              "& .MuiInputBase-input": {
                height: "33.21px",
                padding: "0 14px",
                fontSize: "10.22px",
                color: "#929292",
                fontWeight: 400,
                boxSizing: "border-box",
              },
            }}
          />
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: "34px" }}>
        <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />
      </Box>

      {/* Cards */}
      {visibleProjects.length ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "40px 24px",
          }}
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Box>
      ) : (
        <Typography sx={{ color: "#9A9A9A", fontSize: 14, mt: 4 }}>
          No projects found.
        </Typography>
      )}
    </Box>
  );
}
