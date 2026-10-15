// Data for the mobile "Community" dashboard screen
// (src/components/dashboardv2/communityScreen). Matches the provided
// Figma/iPhone reference. Avatar/photo URLs are generic placeholders
// (i.pravatar.cc) — swap in real images whenever they're available.

export const startDiscussionCard = {
  
  avatars: [
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=33",
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=5",
    "https://i.pravatar.cc/80?img=8",
  ],
};

export const featuredDiscussions = [
  {
    id: 1,
    author: "Angelica Singh",
    avatar: "https://i.pravatar.cc/80?img=47",
    time: "6h ago",
    title: "Lorem ipsum dolor sit amet",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim...",
    hashtags: ["#dolor", "#sit", "#amet", "#magnaaliqua", "#enim"],
    likes: "14.5k",
    comments: "1.5k",
    bookmarks: "124",
  },
  {
    id: 2,
    author: "Angelica Singh",
    avatar: "https://i.pravatar.cc/80?img=33",
    time: "8h ago",
    title: "Lorem ipsum dolor sit amet",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim...",
    hashtags: ["#dolor", "#sit", "#amet", "#magnaaliqua", "#enim"],
    likes: "9.2k",
    comments: "980",
    bookmarks: "76",
  },
  {
    id: 3,
    author: "Angelica Singh",
    avatar: "https://i.pravatar.cc/80?img=11",
    time: "1d ago",
    title: "Lorem ipsum dolor sit amet",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim...",
    hashtags: ["#dolor", "#sit", "#amet", "#magnaaliqua", "#enim"],
    likes: "6.4k",
    comments: "512",
    bookmarks: "58",
  },
];

// `title`/`description` are optional per card — the reference shows a
// different combination on each of the three cards (title+description,
// description only, title only).
export const contributeItems = [
  {
    id: "upload-projects",
    badge: "Open to all",
    title: "Upload Your Projects",
    description:
      "Share your projects with the community to showcase your work.",
    column: "left",
  },
  {
    id: "write-for-us",
    badge: "Write for us",
    description:
      "Submit a blog request and contribute content that helps the community grow.",
    column: "right",
  },
  {
    id: "get-involved",
    badge: "Get involved",
    title: "Join as a Contributor",
    column: "right",
  },
];

export const communityStats = [
  { id: 1, value: "120+", label: "Community members" },
  { id: 2, value: "150+", label: "Community contributions" },
  { id: 3, value: "25+", label: "Events hosted" },
];



// Second member's name/role are truncated by the card edge in the supplied
// reference image itself (cut off at the screen boundary) — "Pushti Soni /
// Full Stack Developer" is a reasonable completion of the visible fragment
// ("Pushti Son…" / "Full Stack D…"); update once the real name is known.
export const teamMembers = [
  {
    id: 1,
    name: "Angelica Singh",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: 2,
    name: "Pushti Soni",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/120?img=53",
  },
  {
    id: 3,
    name: "Ayush Singh",
    role: "App Developer",
    avatar: "https://i.pravatar.cc/120?img=13",
  },
  {
    id: 4,
    name: "Sarah Fatima",
    role: "Flutter Developer",
    avatar: "https://i.pravatar.cc/120?img=14",
  },
];

export const askQuestionCategories = [
  "Community Help",
  "Web Development",
  "Mobile Development",
  "React",
  "React Native",
  "JavaScript",
  "Backend",
];

export const projectTechStack = [
  "React",
  "React Native",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Tailwind CSS",
];




















export const discussionFilters = ["Trending", "Active", "Unanswered"];

export const discussionQuestions = [
  {
    id: 1,
    title: "How to manage state efficiently in Flutter without overcomplicating the app?",
    author: "Angelica Singh",
    avatar: "https://i.pravatar.cc/80?img=33",
    time: "6h ago",
    answers: 5,
    images: [],
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    author: "Angelica Singh",
    avatar: "https://i.pravatar.cc/80?img=33",
    time: "6h ago",
    answers: 5,
    images: [],
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur?",
    author: "Angelica Singh",
    avatar: "https://i.pravatar.cc/80?img=33",
    time: "6h ago",
    answers: 5,
    images: [
      "https://picsum.photos/seed/flutterkanpur-thread-1/300/200",
      "https://picsum.photos/seed/flutterkanpur-thread-2/300/200",
      "https://picsum.photos/seed/flutterkanpur-thread-3/300/200",
    ],
  },
];
