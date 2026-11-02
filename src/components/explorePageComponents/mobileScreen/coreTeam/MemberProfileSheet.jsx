"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

const SocialButton = ({ href, label, children }) => (
  <IconButton
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    sx={{
      width: "48px",
      height: "48px",
      border: `1px solid ${colors.primary[100]}`,
      backgroundColor: "#FFFFFF",
      color: colors.neutral[950],
      boxShadow: "0 1px 4px rgba(65, 103, 242, 0.12)",
    }}
  >
    {children}
  </IconButton>
);

/**
 * MemberProfileSheet — bottom sheet with the selected member's profile.
 */
const MemberProfileSheet = ({ open, member, onClose }) => (
  <Drawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    sx={{ zIndex: 1300 }}
    slotProps={{
      paper: {
        sx: {
          width: "100%",
          maxWidth: "480px",
          mx: "auto",
          maxHeight: "90vh",
          boxSizing: "border-box",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          backgroundColor: "#FFFFFF",
          pt: "21px",
          pb: "40px",
          "&::-webkit-scrollbar": { display: "none" },
        },
      },
    }}
  >
    {member && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Drag handle */}
        <Box
          sx={{
            width: "77px",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: "#1F1F1F",
          }}
        />

        <Typography
          sx={{
            mt: "17px",
            fontFamily,
            fontSize: "14px",
            lineHeight: "20px",
            color: colors.neutral[500],
          }}
        >
          Part of Flutter Kanpur since
        </Typography>
        <Typography
          sx={{
            fontFamily,
            fontSize: "16px",
            lineHeight: "24px",
            color: colors.neutral[950],
          }}
        >
          {member.since}
        </Typography>

        <Box
          component="img"
          src={member.avatar}
          alt={member.name}
          sx={{
            mt: "16px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${colors.primary[500]}`,
          }}
        />

        <Typography
          sx={{
            mt: "16px",
            fontFamily,
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            color: colors.neutral[950],
          }}
        >
          {member.name}
        </Typography>
        <Typography
          sx={{
            fontFamily,
            fontSize: "16px",
            lineHeight: "24px",
            color: colors.neutral[500],
          }}
        >
          {member.title}
        </Typography>

        <Box sx={{ mt: "12px", display: "flex", gap: "8px" }}>
          <SocialButton href={member.links?.github} label="GitHub">
            <GitHubIcon sx={{ fontSize: 24 }} />
          </SocialButton>
          <SocialButton href={member.links?.website} label="Website">
            <LanguageIcon sx={{ fontSize: 24 }} />
          </SocialButton>
          <SocialButton href={member.links?.linkedin} label="LinkedIn">
            <LinkedInIcon sx={{ fontSize: 24 }} />
          </SocialButton>
        </Box>

        <Typography
          sx={{
            mt: "16px",
            px: "36px",
            fontFamily,
            fontSize: "16px",
            lineHeight: "24px",
            color: colors.neutral[500],
          }}
        >
          {member.bio}
        </Typography>

        <Typography
          sx={{
            mt: "15px",
            fontFamily,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            color: colors.neutral[950],
          }}
        >
          Skills & Tools
        </Typography>
        <Box
          sx={{
            mt: "12px",
            px: "36px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {member.skills.map((skill) => (
            <Box
              key={skill}
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                height: "32px",
                px: "16px",
                borderRadius: "999px",
                backgroundColor: colors.primary[100],
                fontFamily,
                fontSize: "14px",
                lineHeight: "20px",
                color: colors.neutral[950],
              }}
            >
              {skill}
            </Box>
          ))}
        </Box>
      </Box>
    )}
  </Drawer>
);

export default MemberProfileSheet;
