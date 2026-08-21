"use client";

import Button from "@mui/material/Button";
import Image from "next/image";

import { t, assets, fontFamily } from "../tokens";

const ShowMoreButton = ({ onClick, label = "Show more" }) => (
  <Button
    onClick={onClick}
    endIcon={<Image src={assets.arrowUpRight} alt="" width={12} height={12} />}
    sx={{
      alignSelf: "flex-start",
      textTransform: "none",
      fontFamily,
      fontSize: t.typography.label2.fontSize,
      fontWeight: t.typography.label2.fontWeight,
      color: t.text.heading,
      bgcolor: t.surface.card,
      border: `1px solid ${t.border.subtle}`,
      borderRadius: t.radius.full,
      boxShadow: t.shadow.card,
      px: t.spacing.xl,
      py: t.spacing.sm,
      "&:hover": {
        bgcolor: t.colors.neutral[50],
        borderColor: t.colors.neutral[200],
      },
    }}
  >
    {label}
  </Button>
);

export default ShowMoreButton;
