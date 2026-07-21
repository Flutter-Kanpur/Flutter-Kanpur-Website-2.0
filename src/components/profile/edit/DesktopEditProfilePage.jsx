"use client";

import {
  Box, Button, Typography, Avatar, TextField, Paper, Chip,
  Divider, Switch, InputAdornment
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";

const skills = ["UI Design", "Flutter Developer", "abcdefg", "Web Developer", "Figma"];
const addSkills = ["Flutter", "Dart", "Figma", "Kubernetes", "Docker", "Kafka", "Prisma", "Canva", "JavaScript", "Mongo", "Postgres"];

export default function DesktopEditProfilePage() {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        width: "100%",
        px: { sm: 2, md: 3, lg: 5 },
        py: 4,
        display: { xs: "none", sm: "block" },
        overflowX: "hidden",
      }}
    >
      <Button
        startIcon={<ArrowBackIosNewIcon sx={{ fontSize: { sm: 14, md: 16 } }} />}
        variant="outlined"
        size="small"
        sx={{
          textTransform: "none",
          borderRadius: { sm: "10px", md: "12px" },
          color: "#333",
          borderColor: "#ddd",
          mb: { sm: 3, md: 6 },
          height: { sm: 36, md: 40, lg: 44 },
          px: { sm: 1.5, md: 2 },
          fontSize: { sm: "13px", md: "14px", lg: "15px" },
          fontWeight: 500,
          width: "fit-content",
          minWidth: "auto",
        }}
      >
        Back
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", lg: "1fr 320px" },
          gap: { sm: 3, lg: 6 },
        }}
      >
        {/* LEFT FORM */}
        <Box sx={{ maxWidth: 720, minWidth: 0, width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 5 }}>
            <Avatar src="/assets/profile-page-assets/profile.png" sx={{ width: 92, height: 92 }} />

            <Box>
              <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                <Button variant="outlined" sx={btnStyle}>Change photo</Button>
                <Button variant="outlined" sx={{ ...btnStyle, color: "#ff3b3b" }}>
                  Remove Photo
                </Button>
              </Box>

              <Typography sx={{ color: "#555", fontSize: 14 }}>
                At least 800*800 px recommended. <br />
                JPG or PNG is allowed.
              </Typography>
            </Box>
          </Box>

          <Typography sx={titleStyle}>Personal information</Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, mb: 3 }}>
            <Input label="Full name" value="test" />
            <Input label="Username" value="test12" />
          </Box>

          <Typography sx={titleStyle}>Location</Typography>
          <TextField
            fullWidth
            size="small"
            defaultValue="kanpur"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />

          <Typography sx={{ ...titleStyle, mt: 4 }}>Bio</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            placeholder="Tell us about yourself (Max 500 Characters)"
            sx={fieldStyle}
            helperText="0/500"
            FormHelperTextProps={{ sx: { textAlign: "right" } }}
          />

          <Divider sx={{ my: 4 }} />

          <Typography sx={titleStyle}>Skills</Typography>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 4 }}>
            {skills.map((item) => (
              <Chip key={item} label={item} variant="outlined" sx={chipStyle} />
            ))}
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Typography sx={titleStyle}>Social Links</Typography>
          <SocialLinks />
        </Box>

        {/* RIGHT EDIT CARD */}
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 4,
            p: 3,
            height: "fit-content",
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 3 }}>Edit</Typography>

          <Typography sx={titleStyle}>Add skills</Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Search roles or skills..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            sx={fieldStyle}
          />

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            {addSkills.map((item) => (
              <Chip key={item} label={item} variant="outlined" sx={chipStyle} />
            ))}
          </Box>

          <Typography sx={{ color: "#4568ff", mt: 2, cursor: "pointer" }}>
            Add other
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={titleStyle}>Social Links</Typography>
            <Button size="small" startIcon={<EditIcon />} sx={{ textTransform: "none" }}>
              Edit
            </Button>
          </Box>

          <SocialLinks />

          <Divider sx={{ my: 4 }} />

          <Typography sx={titleStyle}>Profile Visibility</Typography>

          <VisibilityRow text="Show profile publicly" />
          <VisibilityRow text="how badges on profile" />
          <VisibilityRow text="Show activity history" />
        </Paper>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 6 }}>
        <Button variant="outlined" sx={{ ...btnStyle, width: 170 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            width: 180,
            borderRadius: 5,
            textTransform: "none",
            bgcolor: "#050505",
            "&:hover": { bgcolor: "#222" },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

function Input({ label, value }) {
  return (
    <Box>
      <Typography sx={{ color: "#444", fontSize: 14, mb: 0.5, fontWeight: 500 }}>{label}</Typography>
      <TextField fullWidth size="small" defaultValue={value} sx={fieldStyle} />
    </Box>
  );
}

function SocialLinks() {
  const links = [
    [<LinkedInIcon />, "https://www.linkedin.com/in/username"],
    [<GitHubIcon />, "https://github.com/username"],
    [<LanguageIcon />, "https://username.in"],
  ];

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      {links.map(([icon, text], index) => (
        <Box
          key={text}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1.2,
            borderBottom: index !== links.length - 1 ? "1px solid #eee" : "none",
          }}
        >
          {icon}
          <Typography>{text}</Typography>
        </Box>
      ))}
    </Paper>
  );
}

function VisibilityRow({ text }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
      <Typography sx={{ fontSize: 16 }}>{text}</Typography>
      <Switch defaultChecked />
    </Box>
  );
}

const titleStyle = {
  fontSize: 16,
  fontWeight: 600,
  mb: 1,
  color: "#1a1a1a",
};

const btnStyle = {
  textTransform: "none",
  borderRadius: 2,
  borderColor: "#ddd",
  color: "#555",
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
  },
};

const chipStyle = {
  borderRadius: "20px",
  px: 1,
};