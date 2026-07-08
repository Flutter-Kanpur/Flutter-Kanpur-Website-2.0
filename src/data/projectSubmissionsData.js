// Content + data for the Project Submissions page (/explore/projects).
// Everything the UI renders lives here so it can be swapped for a Supabase
// query later without touching the components. Shape the rows returned from
// Supabase to match `project` below and the components keep working.

export const projectSubmissionsContent = {
  backLabel: "Back",
  backHref: "/explore",
  title: "Project Submissions",
  subtitle: "Manage and review your submitted projects.",
  listTitle: "Your Projects",
  searchPlaceholder: "Search project...",
};

// Status meta — key is stored on each project row; the UI reads label/colors
// from here so a Supabase enum value maps straight onto a badge.
const ICON_BASE = "/assets/explore-page-assets";

export const projectStatusConfig = {
  published: {
    label: "Published",
    color: "#1BA345",
    icon: `${ICON_BASE}/published.svg`,
  },
  rejected: {
    label: "Rejected",
    color: "#EF4444",
    icon: `${ICON_BASE}/rejected.svg`,
  },
  needs_changes: {
    label: "Needs changes",
    color: "#D97706",
    icon: `${ICON_BASE}/rejected.svg`,
  },
  in_review: {
    label: "In review",
    color: "#2563EB",
    icon: `${ICON_BASE}/rejected.svg`,
  },
};

// Filter tabs. `value === null` means "show everything".
export const projectFilters = [
  { label: "All", value: null },
  { label: "Rejected", value: "rejected" },
  { label: "Published", value: "published" },
  { label: "Needs changes", value: "needs_changes" },
  { label: "In review", value: "in_review" },
];

// Options for the "Tech stack" <select> in the upload form.
export const techStackOptions = [
  "React",
  "Next.js",
  "Node",
  "Express",
  "MongoDb",
  "PostgreSQL",
  "Docker",
  "Flutter",
  "Firebase",
  "Git",
];

// Sample rows — replace with a Supabase fetch. Each row is self-describing.
export const projectSubmissions = [
  {
    id: 1,
    name: "Expense Tracker",
    techStack: ["React", "Express", "Node", "Docker", "MongoDb", "Git"],
    author: "Sarah Fatima",
    submittedOn: "21 Jan 2026",
    status: "published",
    links: {
      github: "",
      live: "",
      website: "",
    },
    detailsHref: "#",
  },
  {
    id: 2,
    name: "Expense Tracker",
    techStack: ["React", "Express", "Node", "Docker", "MongoDb", "Git"],
    author: "Sarah Fatima",
    submittedOn: "21 Jan 2026",
    status: "rejected",
    links: {
      github: "",
      live: "",
      website: "",
    },
    detailsHref: "#",
  },
  {
    id: 3,
    name: "Expense Tracker",
    techStack: ["React", "Express", "Node", "Docker", "MongoDb", "Git"],
    author: "Sarah Fatima",
    submittedOn: "21 Jan 2026",
    status: "rejected",
    links: {
      github: "",
      live: "",
      website: "",
    },
    detailsHref: "#",
  },
  {
    id: 4,
    name: "Expense Tracker",
    techStack: ["React", "Express", "Node", "Docker", "MongoDb", "Git"],
    author: "Sarah Fatima",
    submittedOn: "21 Jan 2026",
    status: "published",
    links: {
      github: "",
      live: "",
      website: "",
    },
    detailsHref: "#",
  },
];
