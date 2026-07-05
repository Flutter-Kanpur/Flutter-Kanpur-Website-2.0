import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CompactEventCard from "../compactEventCard/CompactEventCard";
import GradientHeader from "@/components/header/GradientHeader";
import Image from "next/image";

/* ─── localStorage helpers ─── */

const LS_KEY = "recentSearches";
const MAX_RECENT = 5;

const getRecentSearches = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveRecentSearch = (term) => {
  if (!term.trim()) return;
  const current = getRecentSearches();
  const deduped = [term.trim(), ...current.filter((s) => s !== term.trim())];
  localStorage.setItem(LS_KEY, JSON.stringify(deduped.slice(0, MAX_RECENT)));
};

const removeRecentSearch = (term) => {
  const current = getRecentSearches();
  localStorage.setItem(
    LS_KEY,
    JSON.stringify(current.filter((s) => s !== term)),
  );
};

const clearAllRecentSearches = () => {
  localStorage.removeItem(LS_KEY);
};

/* ─── Component ─── */

/**
 * SearchScreen — Full-screen search experience matching the reference design.
 *
 * @param {Array}    events  – All event objects (for trending, suggestions, explore more)
 * @param {function} onBack  – Callback to return to Dashboard
 */
const SearchScreen = ({ events = [], onBack = () => {} }) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(getRecentSearches);
  const inputRef = useRef(null);

  // Auto-focus the input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ── Derived data ── */

  // Trending = 5 most recent events by title
  const trendingSearches = useMemo(
    () =>
      events
        .slice(0, 5)
        .map((e) => e.title || "")
        .filter(Boolean),
    [events],
  );

  // Explore more = 2 most recent events
  const exploreMoreEvents = useMemo(() => events.slice(0, 2), [events]);

  // Suggestions = events whose titles include the query
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return events.filter((e) => e.title?.toLowerCase().includes(q));
  }, [query, events]);

  /* ── Handlers ── */

  const handleNavigateToEvent = useCallback((eventId) => {
    window.location.href = `/explore?eventId=${eventId}`;
  }, []);

  const handleSubmitSearch = useCallback(
    (searchTerm) => {
      const term = (searchTerm ?? query).trim();
      if (!term) return;

      saveRecentSearch(term);
      setRecentSearches(getRecentSearches());

      const match = events.find(
        (e) => e.title?.toLowerCase() === term.toLowerCase(),
      );
      if (match) {
        handleNavigateToEvent(match.id);
      } else {
        window.location.href = `/explore?search=${encodeURIComponent(term)}`;
      }
    },
    [query, events, handleNavigateToEvent],
  );

  const handleTrendingClick = useCallback(
    (title) => {
      setQuery(title);
      saveRecentSearch(title);
      setRecentSearches(getRecentSearches());
      const match = events.find(
        (e) => e.title?.toLowerCase() === title.toLowerCase(),
      );
      if (match) handleNavigateToEvent(match.id);
    },
    [events, handleNavigateToEvent],
  );

  const handleRecentClick = useCallback((term) => {
    setQuery(term);
  }, []);

  const handleDeleteRecent = useCallback((term) => {
    removeRecentSearch(term);
    setRecentSearches(getRecentSearches());
  }, []);

  const handleClearAllRecent = useCallback(() => {
    clearAllRecentSearches();
    setRecentSearches([]);
  }, []);

  const handleSuggestionClick = useCallback(
    (event) => {
      saveRecentSearch(event.title);
      setRecentSearches(getRecentSearches());
      handleNavigateToEvent(event.id);
    },
    [handleNavigateToEvent],
  );

  const clearQuery = useCallback(() => setQuery(""), []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleSubmitSearch();
    },
    [handleSubmitSearch],
  );

  const hasQuery = query.trim().length > 0;

  /* ── Highlight matched text in suggestions ── */
  const highlightMatch = (text, q) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <Box component="span" sx={{ fontWeight: 700, color: "#1A1A2E" }}>
          {text.slice(idx, idx + q.length)}
        </Box>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "430px",
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <GradientHeader
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* ── Back to home ── */}
      <Box
        onClick={onBack}
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          px: "16px",
          pt: "52px",
          pb: "8px",
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "14px", color: "#1A1A2E" }} />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#1A1A2E",
          }}
        >
          Back to home
        </Typography>
      </Box>

      {/* ── Search Input Bar ── */}
      <Box
        sx={{
          px: "16px",
          pb: "8px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#FAFBFF",
            borderRadius: "24px",
            px: "16px",
            height: "52px",
            border: "1px solid #DCE8F8",
            boxShadow: "inset 0px 0px 15px #2373E23D, 0px 0px 10px #2373E236",
          }}
        >
          <Image
            src="/assets/landing-page-assets/search.svg"
            alt="Search"
            width={18}
            height={18}
            style={{
              marginRight: "10px",
              flexShrink: 0,
            }}
          />
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for events..."
            fullWidth
            sx={{
              fontSize: "16px",
              color: "#1A1A2E",
              py: "10px",
              "& input::placeholder": {
                color: "#929292",
                opacity: 1,
              },
            }}
          />
          {hasQuery ? (
            <IconButton onClick={clearQuery} sx={{ p: "4px", ml: "4px" }}>
              <CancelIcon sx={{ fontSize: "18px", color: "#000000" }} />
            </IconButton>
          ) : (
            <>
              <Box
                sx={{
                  height: "24px",
                  width: "1px",
                  bgcolor: "#000000",
                  mx: "10px",
                  flexShrink: 0,
                }}
              />
              <Image
                src="/assets/landing-page-assets/mic.svg"
                alt="Mic"
                width={18}
                height={18}
                style={{
                  flexShrink: 0,
                }}
              />
            </>
          )}
        </Box>
      </Box>

      {/* ── Content ── */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: "20px",
          py: "4px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {hasQuery ? (
          /* ── Suggestions List ── */
          suggestions.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {suggestions.map((event) => (
                <Box
                  key={event.id}
                  onClick={() => handleSuggestionClick(event)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    py: "14px",
                    px: "4px",
                    borderBottom: "1px solid #F3F4F6",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "background-color 0.12s ease",
                    "&:hover": { bgcolor: "#F9FAFB" },
                    "&:active": { bgcolor: "#F3F4F6" },
                  }}
                >
                  <Image
                    src="/assets/landing-page-assets/search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                    style={{
                      marginRight: "10px",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "#5A5A6E",
                      flex: 1,
                      lineHeight: 1.4,
                    }}
                  >
                    {highlightMatch(event.title, query)}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: "48px" }}>
              <Typography sx={{ color: "#9CA3AF", fontSize: "15px" }}>
                No results found for "{query}"
              </Typography>
            </Box>
          )
        ) : (
          /* ── Default sections ── */
          <>
            {/* ── Trending Searches (chips) ── */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "28px",
                color: "#000000",
                mt: "12px",
                mb: "10px",
              }}
            >
              Trending searches
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "18px",
                mb: "24px",
              }}
            >
              {trendingSearches.map((title, i) => (
                <Chip
                  key={`trending-${i}`}
                  icon={
                    <Box
                      component="img"
                      src="/assets/landing-page-assets/clock.svg"
                      alt="Trending"
                      sx={{
                        width: "14px",
                        height: "14px",
                        ml: "8px",
                        color: "#000000",
                      }}
                    />
                  }
                  label={title}
                  onClick={() => handleTrendingClick(title)}
                  variant="outlined"
                  sx={{
                    height: "48px",
                    borderRadius: "16px",

                    bgcolor: "#FFFFFF",
                    border: "1.5px solid #D9D9D9",

                    color: "#111111",

                    cursor: "pointer",
                    transition: "all 0.15s ease",

                    "& .MuiChip-label": {
                      px: "8px",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    },

                    "& .MuiChip-icon": {
                      color: "#111111",
                      fontSize: "22px !important",
                      ml: "8px",
                    },

                    "&:hover": {
                      bgcolor: "#FFFFFF",
                      borderColor: "#CFCFCF",
                    },

                    "&:active": {
                      bgcolor: "#FAFAFA",
                    },
                  }}
                />
              ))}
            </Box>

            {/* ── Recent Searches (chips + Clear) ── */}
            {recentSearches.length > 0 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "10px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "#000000",
                    }}
                  >
                    Recent searches
                  </Typography>

                  <Button
                    variant="text"
                    onClick={handleClearAllRecent}
                    sx={{
                      color: "#EF4444",
                      fontSize: "18px",
                      fontWeight: 400,
                      p: 0,
                      minWidth: "auto",
                      textTransform: "none",
                      lineHeight: 1,
                      "&:hover": {
                        bgcolor: "transparent",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Clear
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    mb: "24px",
                  }}
                >
                  {recentSearches.map((term, i) => (
                    <Chip
                      key={`recent-${i}`}
                      icon={
                        <Box
                          component="img"
                          src="/assets/landing-page-assets/clock.svg"
                          alt="Trending"
                          sx={{
                            width: "14px",
                            height: "14px",
                            ml: "8px",
                            color: "#000000",
                          }}
                        />
                      }
                      label={
                        term.length > 18 ? term.slice(0, 18) + "..." : term
                      }
                      onClick={() => handleRecentClick(term)}
                      variant="outlined"
                      sx={{
                        height: "44px",
                        borderRadius: "14px",

                        bgcolor: "#EFF3FF",
                        border: "none",

                        color: "#000000",
                        cursor: "pointer",

                        "& .MuiChip-label": {
                          px: "12px",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                        },

                        "& .MuiChip-icon": {
                          color: "#000000",
                          width: "14px",
                          height: "14px",
                          ml: "10px",
                          mr: "-4px",
                        },

                        "& .MuiChip-deleteIcon": {
                          display: "none",
                        },

                        "&:hover": {
                          bgcolor: "#EEF2FA",
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            )}

            {/* ── Explore More ── */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 400,
                color: "#000000",
                mb: "10px",
              }}
            >
              Explore more
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                pb: "24px",
              }}
            >
              {exploreMoreEvents.map((event) => (
                <CompactEventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  dateTime={event.dateTime}
                  status={event.status}
                  onClick={handleNavigateToEvent}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchScreen;
