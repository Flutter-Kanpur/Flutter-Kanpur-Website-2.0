"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/navigation";
import GradientHeader from "@/components/header/GradientHeader";
import TeamGroup from "./TeamGroup";
import MemberProfileSheet from "./MemberProfileSheet";
import { useCoreTeam } from "@/hooks/useCoreTeam";

const CoreTeamSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", mt: 2 }}>
    {[1, 2, 3].map((i) => (
      <Skeleton
        key={i}
        variant="rounded"
        height={64}
        sx={{ borderRadius: "16px", bgcolor: "#f1f5f9" }}
      />
    ))}
  </Box>
);

/**
 * CoreTeamScreen — Mobile "Core team" (route: /explore/core-team)
 */
const CoreTeamScreen = () => {
  const router = useRouter();
  const { teamGroups, loading, error, refetch } = useCoreTeam();
  const [userToggledGroups, setUserToggledGroups] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const defaultOpenIds = useMemo(
    () => teamGroups.filter((g) => g.defaultOpen).map((g) => g.id),
    [teamGroups]
  );
  const openGroups = userToggledGroups ?? defaultOpenIds;

  const toggleGroup = (id) =>
    setUserToggledGroups((prev) => {
      const current = prev ?? defaultOpenIds;
      return current.includes(id)
        ? current.filter((g) => g !== id)
        : [...current, id];
    });

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
        {loading && <CoreTeamSkeleton />}

        {error && !loading && (
          <Box sx={{ textAlign: "center", py: 6, px: 2 }}>
            <Typography sx={{ color: "error.main", mb: 2, fontSize: "15px" }}>
              Unable to load team members right now.
            </Typography>
            <Button variant="outlined" onClick={refetch}>
              Retry
            </Button>
          </Box>
        )}

        {!loading && !error && teamGroups.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6, px: 2 }}>
            <Typography sx={{ color: "#64748b", fontSize: "16px" }}>
              No team members listed yet.
            </Typography>
          </Box>
        )}

        {!loading &&
          !error &&
          teamGroups.map((group) => (
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
