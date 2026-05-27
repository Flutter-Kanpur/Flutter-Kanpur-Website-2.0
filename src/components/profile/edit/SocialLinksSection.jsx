"use client";

import { Typography, TextField, InputAdornment } from "@mui/material";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

export default function SocialLinksSection({
  githubLink,
  setGithubLink,
  linkedinLink,
  setLinkedinLink,
  websiteLink,
  setWebsiteLink,
}) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Work & social links
      </Typography>

      <TextField
        fullWidth
        placeholder="github.com/username"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Image src="/assets/profile-page-assets/manage-profile-page-assets/github_icon.svg" alt="GitHub" width={20} height={20} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        placeholder="linkedin.com/in/username"
        value={linkedinLink}
        onChange={(e) => setLinkedinLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        placeholder="https://yourwebsite.com"
        value={websiteLink}
        onChange={(e) => setWebsiteLink(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LanguageIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />
    </>
  );
}