"use client";

import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function DesktopProfilePage() {
  return (
    <Box
  sx={{
    flex: 1,
    px: 5,
    pt: 4,
    pb: 6,
    display: { xs: "none", md: "block" },
    maxWidth: "calc(100vw - 340px)",
    overflowX: "hidden",
  }}
>
      {/* Top Bar */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 4,
    maxWidth: 1120,
    mx: "auto",
  }}
>
      <Button
  variant="outlined"
  startIcon={
    <Image
      src="/assets/profile-page-assets/back_arrow_icon.svg"
      alt="Back"
      width={22}
      height={22}
    />
  }
  sx={{
    height: 56,
    borderRadius: "16px",
    px: 3,
    borderColor: "#DADADA",
    color: "#3A3A3A",
    fontSize: "18px",
    fontWeight: 500,
    textTransform: "none",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",

    "&:hover": {
      borderColor: "#DADADA",
      background: "#fff",
    },
  }}
>
  Back
</Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search menu options..."
            InputProps={{
              endAdornment: <SearchIcon sx={{ color: "#777" }} />,
            }}
            sx={{
              width: 420,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <IconButton
            sx={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              width: 42,
              height: 42,
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "minmax(620px, 760px) 360px",
      gap: 3,
      alignItems: "start",
    }}
  >
        {/* Left Content */}
        <Box>
          {/* Photo Row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <Avatar
              src="/assets/profile-page-assets/profile.png"
              sx={{ width: 92, height: 92 }}
            />

            <Box>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#555",
                  borderColor: "#ddd",
                  borderRadius: "10px",
                  mb: 1,
                }}
              >
                Change photo
              </Button>
              <Typography sx={{ color: "#777", fontSize: 14 }}>
                At least 800*800 px recommended.
                <br />
                JPG or PNG is allowed.
              </Typography>
            </Box>
          </Box>

          {/* Personal Info */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: "14px", mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Personal info
              </Typography>

              <Button
                size="small"
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ textTransform: "none", borderRadius: "10px" }}
              >
                Edit
              </Button>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
              <Info label="Full name" value="test" />
              <Info label="Username" value="test123_" />
              <Info label="Email address" value="test123@gmail.com" />
            </Box>
          </Paper>

          {/* Role Location */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 2 }}>
            <SmallCard label="Role" value="Student" editable />
            <SmallCard
              label="Location"
              value="Bengaluru"
              icon={<LocationOnOutlinedIcon />}
            />
          </Box>

          {/* Bio */}
          <Paper variant="outlined" sx={{ p: 2.2, borderRadius: "14px", mb: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
              Bio
            </Typography>
            <Typography sx={{ fontSize: 15 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
              Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
              mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
              Nullam quis imperdiet augue.
            </Typography>
          </Paper>

          {/* Stats */}
          <Box sx={{ display: "flex", gap: 4, my: 3 }}>
            <Stat label="Current Steak" value="151" blue />
            <Stat label="Reputation Points -" value="2489" dark />
          </Box>

          {/* Badges + Recent */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 2, mb: 2 }}>
            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: "14px" }}>
              <Typography sx={{ fontWeight: 600 }}>Badges</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography sx={{ fontSize: 52, color: "#4f6df5", fontWeight: 700 }}>
                  8+
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Avatar sx={{ width: 62, height: 62 }} />
                  <Avatar sx={{ width: 62, height: 62 }} />
                  <Avatar sx={{ width: 62, height: 62 }} />
                </Box>
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: "14px" }}>
              <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
                Recent Activity
              </Typography>
              {["2 mins ago", "2 hr ago", "1 day ago", "2 day ago", "1 week ago"].map(
                (time) => (
                  <Typography key={time} sx={{ fontSize: 12, color: "#555" }}>
                    Lorem ipsum dolor sit. ({time})
                  </Typography>
                )
              )}
            </Paper>
          </Box>

          {/* Bottom Cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.45fr", gap: 3 }}>
            <SummaryCard
              title="Practice Summary"
              button="Go To Practice"
              rows={[
                ["Problems Solved", "48"],
                ["Problem of the day Streak", "151"],
                ["Contests Participated", "12"],
                ["Best Contest Rank", "2nd"],
              ]}
            />

            <SummaryCard
              title="Contributions"
              button="View My Contributions"
              rows={[
                ["Forum Discussions Count", "35"],
                ["Blogs Published", "4"],
                ["Projects Submitted", "2"],
                ["Events Attended", "15"],
              ]}
            />
          </Box>
        </Box>

        {/* Right Content */}
        <Box>
          <CompleteProfileCard />
          <LeaderboardCard />
        </Box>
      </Box>
    </Box>
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Box>
      <Typography sx={{ color: "#888", fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ fontSize: 16 }}>{value}</Typography>
    </Box>
  );
}

function SmallCard({ label, value, editable, icon }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1.4,
        borderRadius: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
        {icon} {label} &nbsp; - &nbsp;{" "}
        <Box component="span" sx={{ fontWeight: 400 }}>
          {value}
        </Box>
      </Typography>

      {editable && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ textTransform: "none", borderRadius: "10px" }}
        >
          Edit
        </Button>
      )}
    </Paper>
  );
}

function Stat({ label, value, blue, dark }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography sx={{ fontSize: 20 }}>{label}</Typography>
      <Typography
        sx={{
          fontSize: 20,
          color: blue ? "#fff" : "#fff",
          bgcolor: blue ? "#2f80ed" : "#222",
          px: 1,
          borderRadius: "7px",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

function SummaryCard({ title, rows, button }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: "14px" }}>
      <Typography sx={{ fontWeight: 600, mb: 2 }}>{title}</Typography>

      {rows.map(([name, value]) => (
        <Box
          key={name}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1.2,
            px: 1,
          }}
        >
          <Typography>{name}</Typography>
          <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
        </Box>
      ))}

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            px: 5,
            bgcolor: "#4f6df5",
          }}
        >
          {button}
        </Button>
      </Box>
    </Paper>
  );
}

function CompleteProfileCard() {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: "14px", mb: 3 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
        Complete your profile
      </Typography>

      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          bgcolor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 55,
            height: 55,
            borderRadius: "50%",
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          0%
        </Box>
      </Box>

      {["Account setup", "Upload your photo", "Add your github", "Account setup"].map(
        (item, index) => (
          <Typography key={index} sx={{ mb: 1 }}>
            {index < 2 ? "✅" : "⚠️"} &nbsp; {item}
          </Typography>
        )
      )}
    </Paper>
  );
}

function LeaderboardCard() {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: "14px" }}>
      <Typography
        sx={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
          py: 1,
          fontSize: 20,
          fontWeight: 600,
          mb: 2,
        }}
      >
        Leaderboard
      </Typography>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
        <Box
          key={rank}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            px: 1.5,
            py: 0.6,
            mb: 0.4,
            fontSize: 18,
          }}
        >
          {rank}
        </Box>
      ))}
    </Paper>
  );
}