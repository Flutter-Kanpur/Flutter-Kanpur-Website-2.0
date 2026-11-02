"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import GradientHeader from "@/components/header/GradientHeader";
import TeamGroup from "./TeamGroup";
import MemberProfileSheet from "./MemberProfileSheet";
import { coreTeamGroups } from "@/data/exploreScreenData";

/**
 * CoreTeamScreen — Mobile "Core team" (route: /explore/core-team)
 */
const CoreTeamScreen = () => {
  const router = useRouter();
  const [openGroups, setOpenGroups] = useState(
    coreTeamGroups.filter((g) => g.defaultOpen).map((g) => g.id)
  );
  const [selected, setSelected] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleGroup = (id) =>
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

  const handleSelect = (member) => {
    setSelected(member);
    setSheetOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        minHeight: "100vh",
        mx: "auto",
        pb: "100px",
        boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <GradientHeader title="Core team" onBack={() => router.back()} />

      <Box sx={{ position: "relative", zIndex: 11, px: "20px" }}>
        {coreTeamGroups.map((group) => (
          <TeamGroup
            key={group.id}
            group={group}
            open={openGroups.includes(group.id)}
            onToggle={() => toggleGroup(group.id)}
            onSelectMember={handleSelect}
          />
        ))}
      </Box>

      <MemberProfileSheet
        open={sheetOpen}
        member={selected}
        onClose={() => setSheetOpen(false)}
      />
    </Box>
  );
};

export default CoreTeamScreen;
