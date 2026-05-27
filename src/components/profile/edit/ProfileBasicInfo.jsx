"use client";

import { Typography, TextField, MenuItem } from "@mui/material";

export default function ProfileBasicInfo({
  username,
  setUsername,
  about,
  setAbout,
  experience,
  setExperience,
}) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Username
      </Typography>

      <TextField
        fullWidth
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
      />

      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        About me
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        helperText={`${about.length}/150`}
        inputProps={{ maxLength: 150 }}
        sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
      />

      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Years of Experience
      </Typography>

      <TextField
        select
        fullWidth
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
      >
        <MenuItem value="0–1 years">0–1 years</MenuItem>
        <MenuItem value="1–3 years">1–3 years</MenuItem>
        <MenuItem value="3–5 years">3–5 years</MenuItem>
        <MenuItem value="5+ years">5+ years</MenuItem>
      </TextField>
    </>
  );
}