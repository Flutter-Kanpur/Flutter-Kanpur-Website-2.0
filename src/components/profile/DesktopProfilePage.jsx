
"use client";

import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function DesktopProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("AUTH USER ERROR:", authError);
          router.push("/Auth/login");
          return;
        }

        if (!authUser) {
          router.push("/Auth/login");
          return;
        }

        const { data: profile, error: profileError } =
          await supabase
            .from("users")
            .select("*")
            .eq("uid", authUser.id)
            .maybeSingle();

        if (profileError) {
          console.error("PROFILE FETCH ERROR:", profileError);
          return;
        }

        console.log("DESKTOP PROFILE:", profile);

        setUser({
          ...profile,

          // fallback values from auth if needed
          email: profile?.email || authUser.email || "",

          full_name:
            profile?.full_name ||
            profile?.display_name ||
            authUser.user_metadata?.full_name ||
            authUser.user_metadata?.username ||
            "User",

          username:
            profile?.username ||
            authUser.user_metadata?.username ||
            "",

          photo_url:
            profile?.photo_url ||
            authUser.user_metadata?.avatar_url ||
            "",
        });
      } catch (error) {
        console.error("DESKTOP PROFILE ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading profile...
      </Box>
    );
  }

  if (!user) return null;

  const displayName =
    user.full_name ||
    user.display_name ||
    user.username ||
    "User";

  const username = user.username
    ? `@${user.username}`
    : "";

  const photo = user.photo_url || "";

  const bio =
    user.bio ||
    "No bio added yet.";

  const github = user.github_url || "";
  const linkedin = user.linkedin_url || "";
  const website = user.website_url || "";

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        width: "100%",
        px: { sm: 2, md: 3, lg: 5 },
        pt: { sm: 3, md: 4 },
        pb: 6,
        display: { xs: "none", sm: "block" },
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { sm: "stretch", md: "center" },
          gap: 2,
          mb: 4,
          maxWidth: 1120,
          mx: "auto",
        }}
      >
        <Button
          startIcon={
            <Image
              src="/assets/profile-page-assets/back_arrow_icon.svg"
              alt="Back"
              width={14}
              height={14}
            />
          }
          variant="outlined"
          size="small"
          onClick={() => router.back()}
          sx={{
            height: { sm: 36, md: 40, lg: 44 },
            minWidth: "auto",
            width: "fit-content",
            borderRadius: { sm: "10px", md: "12px" },
            px: { sm: 1.5, md: 2 },
            borderColor: "#DADADA",
            color: "#3A3A3A",
            fontSize: { sm: "13px", md: "14px", lg: "15px" },
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
            "&:hover": {
              borderColor: "#DADADA",
              background: "#fff",
            },
          }}
        >
          Back
        </Button>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            minWidth: 0,
            flex: 1,
            justifyContent: { md: "flex-end" },
          }}
        >
          <TextField
            size="small"
            placeholder="Search menu options..."
            slotProps={{
              input: {
                endAdornment: <SearchIcon sx={{ color: "#777" }} />,
              },
            }}
            sx={{
              flex: 1,
              maxWidth: { sm: "100%", md: 420 },
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
              flexShrink: 0,
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1120,
          mx: "auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "1fr",
              lg: "minmax(0, 1fr) 320px",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
         
          <Box>
            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 4,
              }}
            >
              <Avatar
                src={photo}
                sx={{
                  width: 92,
                  height: 92,
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                {!photo &&
                  displayName?.[0]?.toUpperCase()}
              </Avatar>

              <Box>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/profile/edit")}
                  sx={{
                    textTransform: "none",
                    color: "#555",
                    borderColor: "#ddd",
                    borderRadius: "10px",
                    mb: 1,
                  }}
                >
                  Edit profile
                </Button>

                <Typography
                  sx={{
                    color: "#555",
                    fontSize: 14,
                  }}
                >
                  {username || "No username added"}
                </Typography>
              </Box>
            </Box>

            {/* PERSONAL INFO */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: "14px",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  Personal info
                </Typography>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => router.push("/profile/edit")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                  }}
                >
                  Edit
                </Button>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    sm: "1fr",
                    md: "repeat(3, 1fr)",
                  },
                  gap: { sm: 2, md: 0 },
                }}
              >
                <Info
                  label="Full name"
                  value={displayName}
                />

                <Info
                  label="Username"
                  value={username || "—"}
                />

                <Info
                  label="Email address"
                  value={user.email || "—"}
                />
              </Box>
            </Paper>

            {/* ROLE + LOCATION */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  sm: "1fr",
                  md: "1fr 1fr",
                },
                gap: 3,
                mb: 2,
              }}
            >
              <SmallCard
                label="Role"
                value={
                  user.roles
                    ? Array.isArray(user.roles)
                      ? user.roles.join(", ")
                      : String(user.roles)
                    : "Student"
                }
                editable
                onEdit={() =>
                  router.push("/profile/edit")
                }
              />

              <SmallCard
                label="Location"
                value={user.location || "Not added"}
                icon={
                  <LocationOnOutlinedIcon
                    sx={{ verticalAlign: "middle" }}
                  />
                }
              />
            </Box>

            {/* BIO */}
            <Paper
              variant="outlined"
              sx={{
                p: 2.2,
                borderRadius: "14px",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  mb: 2,
                  color: "#1a1a1a",
                }}
              >
                Bio
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  whiteSpace: "pre-wrap",
                }}
              >
                {bio}
              </Typography>
            </Paper>

            {/* EXPERIENCE */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                my: 3,
                flexWrap: "wrap",
              }}
            >
              <Stat
                label="Years of Experience"
                value={
                  user.years_of_experience ??
                  0
                }
              />

              <Stat
                label="Status"
                value={
                  user.status || "Active"
                }
                dark
              />
            </Box>

            {/* BADGES + RECENT */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  sm: "1fr",
                  md: "1.5fr 1fr",
                },
                gap: 2,
                mb: 2,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: "14px",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  Badges
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { sm: 2, md: 3 },
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { sm: 40, md: 52 },
                      color: "#4f6df5",
                      fontWeight: 700,
                    }}
                  >
                    0
                  </Typography>

                  <Typography
                    sx={{
                      color: "#666",
                    }}
                  >
                    No badges yet
                  </Typography>
                </Box>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    mb: 1,
                  }}
                >
                  Account
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#555",
                  }}
                >
                  Member since{" "}
                  {formatDate(user.created_at)}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#555",
                    mt: 1,
                  }}
                >
                  Last login{" "}
                  {formatDate(user.last_login_at)}
                </Typography>
              </Paper>
            </Box>

            {/* SOCIAL LINKS */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: "14px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Social Links
                </Typography>

                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() =>
                    router.push("/profile/edit")
                  }
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Edit
                </Button>
              </Box>

              <SocialLink
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value={linkedin}
              />

              <SocialLink
                icon={<GitHubIcon />}
                label="GitHub"
                value={github}
              />

              <SocialLink
                icon={<LanguageIcon />}
                label="Website"
                value={website}
              />
            </Paper>
          </Box>

          {/* RIGHT */}
          <Box sx={{ minWidth: 0 }}>
            <CompleteProfileCard user={user} />
            <LeaderboardCard />
          </Box>
        </Box>
      </Box>
      <Box
  sx={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    mt: 5,
    pb: 2,
  }}
>
  <Typography
    sx={{
      fontSize: 12,
      color: "#999",
      fontWeight: 500,
    }}
  >
    Version 1.0.0
  </Typography>
</Box>
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#555",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 16,
          color: "#111",
          wordBreak: "break-word",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function SmallCard({
  label,
  value,
  editable,
  icon,
  onEdit,
}) {
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
        gap: 1,
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: 15, md: 17 },
          fontWeight: 600,
          minWidth: 0,
        }}
      >
        {icon} {label} &nbsp;-&nbsp;
        <Box
          component="span"
          sx={{
            fontWeight: 400,
            wordBreak: "break-word",
          }}
        >
          {value}
        </Box>
      </Typography>

      {editable && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onEdit}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            flexShrink: 0,
          }}
        >
          Edit
        </Button>
      )}
    </Paper>
  );
}

function Stat({ label, value, dark }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography sx={{ fontSize: 18 }}>
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 18,
          color: "#fff",
          bgcolor: dark ? "#222" : "#2f80ed",
          px: 1,
          borderRadius: "7px",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

function SocialLink({ icon, label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 1.2,
        borderBottom: "1px solid #eee",
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      {icon}

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13,
            color: "#777",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            wordBreak: "break-all",
          }}
        >
          {value || "Not added"}
        </Typography>
      </Box>
    </Box>
  );
}

function CompleteProfileCard({ user }) {
  const checks = [
    {
      label: "Account setup",
      complete: Boolean(user?.onboarding_completed),
    },
    {
      label: "Upload your photo",
      complete: Boolean(user?.photo_url),
    },
    {
      label: "Add your GitHub",
      complete: Boolean(user?.github_url),
    },
    {
      label: "Add your LinkedIn",
      complete: Boolean(user?.linkedin_url),
    },
  ];

  const completed = checks.filter(
    (item) => item.complete
  ).length;

  const percentage = Math.round(
    (completed / checks.length) * 100
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: "14px",
        mb: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
          mb: 2,
        }}
      >
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
            fontWeight: 600,
          }}
        >
          {percentage}%
        </Box>
      </Box>

      {checks.map((item) => (
        <Typography
          key={item.label}
          sx={{
            mb: 1,
            fontSize: 14,
          }}
        >
          {item.complete ? "✅" : "⚠️"} {item.label}
        </Typography>
      ))}
    </Paper>
  );
}

function LeaderboardCard() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: "14px",
      }}
    >
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

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
        (rank) => (
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
        )
      )}
      
    </Paper>
    
  );
}


function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}

