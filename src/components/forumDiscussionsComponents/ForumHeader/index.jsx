"use client";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { t, assets, fontFamily } from "../tokens";

const ForumHeader = ({ backLabel, backHref, title, subtitle }) => (
  <Box component="header">
    <Button
      component={Link}
      href={backHref}
      disableElevation
      disableRipple
      sx={{
        height: t.size.backHeight,
        minWidth: 0,
        px: t.spacing.md,
        display: "inline-flex",
        alignItems: "center",
        gap: t.spacing.sm,
        borderRadius: t.radius.sm,
        border: `1px solid ${t.border.subtle}`,
        background: "linear-gradient(180deg, #FFFFFF 0%, #ECECEC 100%)",
        color: t.text.onLight,
        textTransform: "none",
        fontFamily,
        fontSize: t.typography.label2.fontSize,
        fontWeight: t.typography.label2.fontWeight,
        "&:hover": {
          background: "linear-gradient(180deg, #FFFFFF 0%, #E6E6E6 100%)",
          borderColor: t.border.strong,
        },
      }}
    >
      <Image src={assets.backArrow} alt="" width={18} height={18} />
      {backLabel}
    </Button>

    <Box sx={{ mt: t.spacing.xl }}>
      <Typography
        component="h1"
        sx={{
          fontFamily,
          fontSize: t.typography.heading1.fontSize,
          fontWeight: t.typography.label1.fontWeight,
          color: t.text.heading,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontFamily,
          fontSize: t.typography.label3.fontSize,
          fontWeight: t.typography.label3.fontWeight,
          color: t.text.body,
          mt: t.spacing.xs,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  </Box>
);

export default ForumHeader;
