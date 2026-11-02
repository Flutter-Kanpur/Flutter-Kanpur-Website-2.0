"use client";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";

const fontFamily = 'var(--font-product-sans), "Product Sans", sans-serif';

/**
 * MemberCard -- Tap opens the profile sheet.
 */
const MemberCard = ({ member, onSelect }) => {
  const [firstName, ...rest] = member.name.split(" ");
  const isLead = member.role === "Lead";

  return (
    <ButtonBase
      onClick={() => onSelect(member)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "168px",
        boxSizing: "border-box",
        px: "8px",
        py: "12px",
        border: `1px solid ${colors.primary[100]}`,
        borderRadius: "16px",
        background: `linear-gradient(180deg, #FFFFFF 0%, ${colors.primary[50]} 100%)`,
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={member.avatar}
        alt={member.name}
        sx={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `1px solid ${colors.neutral[200]}`,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          mt: "2px",
          fontFamily,
          fontSize: "16px",
          lineHeight: "24px",
          color: colors.neutral[950],
        }}
      >
        {firstName}
        {rest.length > 0 && (
          <>
            <br />
            {rest.join(" ")}
          </>
        )}
      </Typography>
      <Typography
        sx={{
          fontFamily,
          fontSize: "14px",
          lineHeight: "20px",
          color: isLead ? colors.success[600] : colors.primary[500],
        }}
      >
        {member.role}
      </Typography>
    </ButtonBase>
  );
};

export default MemberCard;
