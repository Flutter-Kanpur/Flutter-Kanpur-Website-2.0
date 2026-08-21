export const categories = [
  { id: "hackathon", label: "Hackathon projects" },
  { id: "featured", label: "Featured projects" },
  { id: "uiux", label: "UI/UX projects" },
  { id: "flutter", label: "Flutter projects" },
  { id: "personal", label: "Personal projects" },
];

const placeholderLinks = {
  githubUrl: "#",
  linkedinUrl: "#",
};

export const projectSections = [
  {
    id: "hackathon-featured",
    category: "hackathon",
    title: "Hackathon Projects",
    projects: [
      {
        id: "flutter-space-theme",
        title: "Flutter Space Theme",
        author: "angelica",
        description:
          "A modern, responsive project explorer with immersive cards, launch-ready status, and community feedback integration.",
        ...placeholderLinks,
      },
      {
        id: "flutter-express-tracker",
        title: "Flutter Express Tracker",
        author: "angelica",
        description:
          "A shipping concept built with rich UI states, live tracking visuals, and task-based onboarding flows.",
        ...placeholderLinks,
      },
      {
        id: "flutter-expense-tracker",
        title: "Flutter Expense Tracker",
        author: "angelica",
        description:
          "A personal finance app that helps users track expenses, categorise spending, and visualise insights with charts and analytics dashboards.",
        ...placeholderLinks,
      },
      {
        id: "flutter-idea-lab",
        title: "Flutter Idea Lab",
        author: "angelica",
        description:
          "A rapid prototyping space for event builds, with idea submissions, team matching, and a lightweight voting flow.",
        ...placeholderLinks,
      },
    ],
  },
  {
    id: "uiux",
    category: "uiux",
    title: "UI/UX Projects",
    projects: [
      {
        id: "flutter-home-dashboard",
        title: "Flutter Home Dashboard",
        author: "angelica",
        description:
          "A dashboard concept focusing on cards, filters, and a clean information hierarchy for fast discovery.",
        ...placeholderLinks,
      },
      {
        id: "travel-planner-ui",
        title: "Travel Planner UI",
        author: "angelica",
        description:
          "A mobile-first journey planner with collapsible sections, search, and quick action shortcuts for travellers.",
        ...placeholderLinks,
      },
      {
        id: "motion-kit",
        title: "Flutter Motion Kit",
        author: "angelica",
        description:
          "A library of motion-ready transitions and micro-interactions, documented with live previews and copyable snippets.",
        ...placeholderLinks,
      },
      {
        id: "design-system-explorer",
        title: "Design System Explorer",
        author: "angelica",
        description:
          "A token-driven component browser that pairs colour, type, and spacing scales with real Flutter widget examples.",
        ...placeholderLinks,
      },
    ],
  },
  {
    id: "hackathon-community",
    category: "hackathon",
    title: "Hackathon Projects",
    projects: [
      {
        id: "flutter-event-hub",
        title: "Flutter Event Hub",
        author: "angelica",
        description:
          "A community event directory with category filters, speaker previews, and registration microinteractions.",
        ...placeholderLinks,
      },
      {
        id: "project-showcase-grid",
        title: "Project Showcase Grid",
        author: "angelica",
        description:
          "A showcase platform for project submissions, featuring project cards, tags, and quick action buttons.",
        ...placeholderLinks,
      },
      {
        id: "campus-connect",
        title: "Campus Connect",
        author: "angelica",
        description:
          "A student networking build with interest-based discovery, event reminders, and lightweight group chat.",
        ...placeholderLinks,
      },
      {
        id: "open-source-board",
        title: "Open Source Board",
        author: "angelica",
        description:
          "An issue board surfacing good-first-issues across community repos, with difficulty tags and contributor stats.",
        ...placeholderLinks,
      },
    ],
  },
];

export const showcaseCta = {
  title: "Want to showcase your skills?",
  description:
    "We're always looking for passionate contributors, mentors, and organisers to help grow the Flutter Kanpur community.",
  buttonLabel: "Upload your project",
  buttonHref: "/explore/projects",
};
