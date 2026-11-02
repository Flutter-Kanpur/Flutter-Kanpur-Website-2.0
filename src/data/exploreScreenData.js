// Dummy content for the mobile Explore screen (components/exploreScreen).

export const promoSlides = [
  {
    id: 1,
    title: "Be part of the community",
    description:
      "Connect with developers, designers, and learners. Participate in events, learn together, and contribute to community projects.",
    ctaLabel: "Join community",
    ctaHref: "/community",
  },
  {
    id: 2,
    title: "Learn, build and share",
    description:
      "Read blogs, explore community projects and showcase what you have built with Flutter.",
    ctaLabel: "Browse projects",
    ctaHref: "/explore/browse-projects",
  },
  {
    id: 3,
    title: "Join the conversation",
    description:
      "Ask questions, share answers and grow together with fellow Flutter developers.",
    ctaLabel: "Open forum",
    ctaHref: "/explore/forum-discussions",
  },
];

export const blogFilters = ["DSA", "Flutter", "UI/UX", "Backend"];

const STORY_IMAGE = "/assets/explore-page-assets/stories.svg";

export const blogs = [
  {
    id: 1,
    title: "Getting Started with Flutter Animations",
    readTime: "6 min read",
    author: "Angelica Singh",
    image: "https://t3.ftcdn.net/jpg/04/74/64/76/360_F_474647635_hi7VkJUCtIHRb5fBIsSLiPjywtXtUs3s.jpg",
    href: "/explore",
  },
  {
    id: 2,
    title: "Getting Started with Flutter Animations",
    readTime: "6 min read",
    author: "Angelica Singh",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT89OFodyWmTS-El-w0iy7tdS5hagAdXk0Sh0n3fJThQ&s=10',
    href: "/explore",
  },
  {
    id: 3,
    title: "Getting Started with Flutter Animations",
    readTime: "6 min read",
    author: "Angelica Singh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa0iWUfmTTDjCCREvknq2eew5QT23_OE_mSw37DreP6w&s",
    href: "/explore",
  },
];

export const activities = [
  {
    id: 1,
    title: "Events",
    description: "Meetups, workshops, and sessions.",
    href: "explore/eventsPage",
  },
  {
    id: 2,
    title: "Contests",
    description: "Coding challenges and sprints.",
    href: "explore/contests",
  },
  {
    id: 3,
    title: "Open Calls",
    description: "Speakers, volunteers, and contributors.",
    href: "/explore/open-calls",
  },
];

export const communityProjects = [
  {
    id: 1,
    title: "Event Management Dashboard",
    tags: ["Flutter", "REST API", "Dart"],
    author: "Angelica Singh",
    date: "21 Jan 2026",
    links: { github: "#", link: "#", website: "#" },
  },
  {
    id: 2,
    title: "Event Management Dashboard",
    tags: ["Flutter", "REST API", "Dart"],
    author: "Angelica Singh",
    date: "21 Jan 2026",
    links: { github: "#", link: "#", website: "#" },
  },
];

export const coreTeam = [
  { id: 1, name: "Cameron", avatar: "https://i.pravatar.cc/128?img=68" },
  { id: 2, name: "John", avatar: "https://i.pravatar.cc/128?img=59" },
  { id: 3, name: "Smith", avatar: "https://i.pravatar.cc/128?img=60" },
  { id: 4, name: "Samuel", avatar: "https://i.pravatar.cc/128?img=53" },
  { id: 5, name: "John", avatar: "https://i.pravatar.cc/128?img=59" },
  { id: 6, name: "Rohan", avatar: "https://i.pravatar.cc/128?img=69" },
];

export const suggestedJobs = [
  {
    id: 1,
    title: "Lead Product Designer",
    saved: true,
    tags: ["On-site", "Full-time", "Paid"],
    company: {
      name: "Superkalam",
      location: "Bangalore",
      logo: "https://www.google.com/s2/favicons?domain=superkalam.com&sz=128",
    },
  },
  {
    id: 2,
    title: "Flutter Developer/ UI/UX",
    saved: true,
    tags: ["Hybrid", "Full-time", "Un-paid"],
    company: {
      name: "Quickgik",
      location: "Delhi",
      logo: "https://www.google.com/s2/favicons?domain=quickgick.com&sz=128",
      round: true,
    },
  },
];





// CORE TEAM 




const avatar = (img) => `https://i.pravatar.cc/200?img=${img}`;

export const coreTeamGroups = [
  {
    id: "organisers",
    name: "Organisors",
    members: [
      {
        id: "org-1",
        name: "Rohan Mehta",
        role: "Lead",
        title: "Community Lead • Organiser",
        since: "June 2024",
        avatar: avatar(11),
        bio: "Leads Flutter Kanpur community operations, partnerships, and the yearly event calendar.",
        skills: ["Community", "Public Speaking", "Planning"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "org-2",
        name: "Priya Nair",
        role: "Member",
        title: "Events Manager • Organiser",
        since: "August 2024",
        avatar: avatar(32),
        bio: "Plans meetups, workshops, and speaker sessions for the Flutter Kanpur community.",
        skills: ["Events", "Sponsorship", "Outreach"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "org-3",
        name: "Aman Verma",
        role: "Member",
        title: "Partnerships • Organiser",
        since: "January 2025",
        avatar: avatar(14),
        bio: "Builds relationships with sponsors, colleges, and partner communities.",
        skills: ["Partnerships", "Networking", "Marketing"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
    ],
  },
  {
    id: "app",
    name: "App Team",
    defaultOpen: true,
    members: [
      {
        id: "app-1",
        name: "Hariom Vishwakarma",
        role: "Lead",
        title: "Flutter Developer • App Lead",
        since: "March 2025",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiiqn3JkHrVC4Nm3u5oKEdIHr4qjAwwD3bW_LoUVupg&s=10",
        bio: "Leads development of the Flutter Kanpur mobile app and its release pipeline.",
        skills: ["Flutter", "Dart", "REST API", "Firebase"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "app-2",
        name: "Sarah Fatima",
        role: "Member",
        title: "Flutter Developer • App Team",
        since: "April 2025",
        avatar: avatar(13),
        bio: "Builds app features and keeps the codebase clean, tested, and well documented.",
        skills: ["Flutter", "Dart", "Bloc", "Testing"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "app-3",
        name: "Ayush Singh",
        role: "Member",
        title: "Mobile Developer • App Team",
        since: "May 2025",
        avatar: avatar(53),
        bio: "Works on app performance, offline support, and native integrations.",
        skills: ["Flutter", "Kotlin", "Swift", "CI/CD"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "app-4",
        name: "Karan Jain",
        role: "Member",
        title: "Flutter Developer • App Team",
        since: "July 2025",
        avatar: avatar(68),
        bio: "Implements UI screens and animations for the community app.",
        skills: ["Flutter", "Dart", "Animations", "Riverpod"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "app-5",
        name: "Angelica Singh",
        role: "Member",
        title: "UI/UX Designer • Design Lead",
        since: "March 2026",
        avatar: avatar(47),
        bio: "Works on UI/UX design, branding, and overall visual direction for Flutter Kanpur products and community initiatives.",
        skills: ["Figma", "Framer", "Canva", "Adobe Illustrator", "Miro", "Invision"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
    ],
  },
  {
    id: "web",
    name: "Web Team",
    members: [
      {
        id: "web-1",
        name: "Neha Gupta",
        role: "Lead",
        title: "Frontend Developer • Web Lead",
        since: "February 2025",
        avatar: avatar(5),
        bio: "Leads the Flutter Kanpur website and keeps the web experience fast and accessible.",
        skills: ["React", "Next.js", "MUI", "Accessibility"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "web-2",
        name: "Vikram Rao",
        role: "Member",
        title: "Full-stack Developer • Web Team",
        since: "March 2025",
        avatar: avatar(15),
        bio: "Builds APIs and integrations behind the community website.",
        skills: ["Node.js", "Supabase", "REST API", "SQL"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "web-3",
        name: "Isha Kapoor",
        role: "Member",
        title: "Frontend Developer • Web Team",
        since: "June 2025",
        avatar: avatar(44),
        bio: "Turns designs into responsive, pixel-perfect pages.",
        skills: ["React", "CSS", "Next.js", "Testing"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "web-4",
        name: "Dev Patel",
        role: "Member",
        title: "Frontend Developer • Web Team",
        since: "September 2025",
        avatar: avatar(59),
        bio: "Works on website performance, SEO, and content tooling.",
        skills: ["React", "SEO", "Performance"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
    ],
  },
  {
    id: "design",
    name: "Design Team",
    members: [
      {
        id: "des-1",
        name: "Meera Joshi",
        role: "Lead",
        title: "Product Designer • Design Lead",
        since: "January 2025",
        avatar: avatar(23),
        bio: "Owns the design system and visual language across Flutter Kanpur products.",
        skills: ["Figma", "Design Systems", "Prototyping"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "des-2",
        name: "Sana Khan",
        role: "Member",
        title: "UI Designer • Design Team",
        since: "May 2025",
        avatar: avatar(49),
        bio: "Designs event posters, social creatives, and app screens.",
        skills: ["Figma", "Canva", "Illustration"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
      {
        id: "des-3",
        name: "Tushar Das",
        role: "Member",
        title: "Motion Designer • Design Team",
        since: "October 2025",
        avatar: avatar(33),
        bio: "Creates motion graphics and micro-interactions for the community brand.",
        skills: ["After Effects", "Framer", "Lottie"],
        links: { github: "#", website: "#", linkedin: "#" },
      },
    ],
  },
];











// Dummy data for the mobile Projects screens
// (components/explorePageComponents/mobileScreen/projects).

export const uploadProjectRoute = "/community/project/upload";

export const projectFilterChips = [
  "Mobile app",
  "Flutter",
  "UI/UX",
  "DSA",
  "Web",
  "Open source",
];

export const uploadCtaContent = {
  list: {
    title: "Upload your project",
    description: "Showcase your work and inspire other community members.",
    buttonLabel: "Upload project",
  },
  detail: {
    title: "Upload new project",
    description: "Showcase your work and inspire other community members.",
    buttonLabel: "Upload a new project",
  },
};

export const projectEmptyContent = {
  noProjects: {
    title: "No projects shared yet",
    description:
      "Community projects will appear here once members start sharing their work.",
    buttonLabel: "Upload your project",
  },
  noResults: {
    title: "No results found",
    description:
      "Community projects will appear here once members start sharing their work.",
    buttonLabel: "Upload your project",
  },
};

const links = { github: "#", link: "#", website: "#" };

const detailCopy = {
  about:
    "This project helps users track their expenses, categorize spending, and view insights through simple charts. It was built as a learning project to practice Flutter UI and Firebase integration.",
  features:
    "This project helps users track their expenses, categorize spending, and view insights through simple charts. It was built as a learning project to practice Flutter UI and Firebase integration.",
  screenshots: [
    "/assets/landing-page-assets/updateCard.png",
    "/assets/landing-page-assets/event-banner.png",
  ],
};

export const browseProjects = [
  {
    id: "1",
    title: "Event Management Dashboard",
    summary: "A dashboard to create, manage and track community events.",
    tags: ["Flutter", "REST API", "Dart"],
    categories: ["Flutter", "Mobile app"],
    author: "Angelica Singh",
    date: "21 Jan 2026",
    sharedOn: "21 Jan 2026",
    liked: false,
    links,
    ...detailCopy,
  },
  {
    id: "2",
    title: "Expense Tracker",
    summary: "A mobile app to track daily expenses and manage personal finances.",
    tags: ["React", "Express", "Node", "Docker", "MongoDb", "Git"],
    categories: ["Web"],
    author: "Angelica Singh",
    date: "21 Jan 2026",
    sharedOn: "21 Jan 2026",
    liked: true,
    links,
    ...detailCopy,
  },
  {
    id: "3",
    title: "Expense Tracker App",
    summary: "A mobile app to track daily expenses and manage personal finances.",
    tags: ["Flutter", "Firebase", "REST API"],
    categories: ["Flutter", "Mobile app"],
    author: "Angelica Singh",
    date: "18 Jan 2026",
    sharedOn: "18 Jan 2026",
    liked: false,
    links,
    ...detailCopy,
  },
  {
    id: "4",
    title: "Portfolio UI Kit",
    summary: "A reusable UI kit and design system for developer portfolios.",
    tags: ["Figma", "Design System"],
    categories: ["UI/UX"],
    author: "Sarah Fatima",
    date: "12 Jan 2026",
    sharedOn: "12 Jan 2026",
    liked: false,
    links,
    ...detailCopy,
  },
  {
    id: "5",
    title: "DSA Visualizer",
    summary: "Interactive visualizations for common data structures and algorithms.",
    tags: ["React", "DSA", "Canvas"],
    categories: ["DSA", "Web"],
    author: "Karan Jain",
    date: "05 Jan 2026",
    sharedOn: "05 Jan 2026",
    liked: false,
    links,
    ...detailCopy,
  },
];











// Dummy data for the mobile Events screen
// (components/explorePageComponents/mobileScreen/events).
// Row shape mirrors data/dashboardData.js `events` so a real source can be
// dropped in later; `status` is "live" | "upcoming".

export const eventFilterChips = ["DSA", "Flutter", "UI/UX", "Web", "Backend"];

export const eventsEmptyContent = {
  noEvents: {
    title: "No events scheduled",
    description: "Check back later for upcoming events.",
    buttonLabel: "Browse learning resources",
    href: "/blogs",
  },
  noResults: {
    title: "No events found",
    description: "Try a different search or filter.",
  },
};

const description =
  "Learn production-ready Flutter architecture, design handoff, and real-world workflow tips from industry experts.";

export const eventsList = [
  {
    id: 1,
    title: "From Figma to Flutter: Practical Workflow",
    date: "Sun, 7 Apr",
    time: "4:00 PM",
    location: "Kanpur",
    description,
    status: "live",
    saved: true,
    categories: ["Flutter", "UI/UX"],
  },
  {
    id: 2,
    title: "From Figma to Flutter: Practical Workflow",
    date: "Sun, 7 Apr",
    time: "4:00 PM",
    location: "Kanpur",
    description,
    status: "upcoming",
    saved: true,
    categories: ["Flutter", "UI/UX"],
  },
  {
    id: 3,
    title: "React Frontend Meetup",
    date: "Sun, 14 Apr",
    time: "11:00 AM",
    location: "Delhi",
    description:
      "Learn reusable UI architecture, clean folder structure, and advanced React patterns.",
    status: "upcoming",
    saved: false,
    categories: ["Web"],
  },
  {
    id: 4,
    title: "DSA Problem Solving Sprint",
    date: "Sat, 20 Apr",
    time: "10:00 AM",
    location: "Kanpur",
    description:
      "A hands-on session on arrays, trees and graphs with timed practice rounds.",
    status: "upcoming",
    saved: false,
    categories: ["DSA"],
  },
];

















// Dummy data for the mobile Open Calls screens
// (components/explorePageComponents/mobileScreen/openCalls).
// status: "open" | "closing"



export const openCallFilterChips = ["All", "Speakers", "Volunteers", "Contributors"];

// Options for "Area of Expertise / Role" in the apply form.
export const openCallApplyRoles = [
  "Speaker",
  "Volunteer",
  "Contributor",
  "Flutter Developer",
  "UI/UX Designer",
  "Event Management",
  "Other",
];

export const openCallsEmptyContent = {
  noCalls: {
    title: "No open calls right now",
    description: "Opportunities will appear here when available.",
    buttonLabel: "Join the community",
    href: "/community",
  },
  noResults: {
    title: "No open calls found",
    description: "Try a different search or filter.",
  },
};

const volunteerDetail = {
  summary:
    "Help the Flutter Kanpur team plan and run community events from start to finish.",
  about:
    "Flutter Kanpur organises meetups, workshops and sessions throughout the year. As an event volunteer you will support planning, coordination and on-ground execution so that every session runs smoothly.",
  whoCanApply:
    "Students and professionals who enjoy community work are welcome. No prior volunteering experience is required — just reliability and a willingness to learn.",
  lookingFor:
    "Good communication, ownership of small tasks, and the ability to be present on event days. Experience with event management is a plus but not mandatory.",
};

export const openCalls = [
  {
    id: 1,
    title: "Volunteer for Event Operations",
    description: "Support event planning, coordination, and on-ground execution.",
    audience: "Students and professionals welcome",
    applyBy: "7 Mar 2026",
    deadline: "Mar 7, 2026",
    type: "Volunteers",
    status: "open",
    saved: true,
    applyUrl: "",
    ...volunteerDetail,
  },
  {
    id: 2,
    title: "Volunteer for Event Operations",
    description: "Support event planning, coordination, and on-ground execution.",
    audience: "Students and professionals welcome",
    applyBy: "7 Mar 2026",
    deadline: "Mar 7, 2026",
    type: "Volunteers",
    status: "closing",
    saved: true,
    applyUrl: "",
    ...volunteerDetail,
  },
  {
    id: 3,
    title: "Call for Speakers — Flutter Kanpur Meetups",
    description:
      "We’re inviting Flutter developers to share their knowledge and experiences at upcoming Flutter Kanpur meetups.",
    audience: "Open to Flutter developers of all levels",
    applyBy: "30 Apr 2026",
    deadline: "Apr 30, 2026",
    type: "Speakers",
    status: "open",
    saved: false,
    applyUrl: "",
    summary:
      "We’re inviting Flutter developers to share their knowledge and experiences at upcoming Flutter Kanpur meetups.",
    about:
      "Flutter Kanpur regularly hosts meetups and learning sessions for the community. Through this open call, we’re looking for speakers who are interested in presenting talks, demos, or workshops related to Flutter, mobile development, or related topics.\nSpeakers will get an opportunity to share their experience, connect with the community, and contribute to learning initiatives.",
    whoCanApply:
      "This opportunity is open to Flutter developers of all experience levels. Whether you’re a beginner sharing your learning journey or an experienced developer presenting advanced concepts, we welcome diverse perspectives.",
    lookingFor:
      "We’re looking for clear communication, genuine interest in community learning, and a topic that adds value to Flutter developers. Prior speaking experience is not mandatory.",
  },
  {
    id: 4,
    title: "Contribute to the Community Website",
    description: "Help build features for the Flutter Kanpur website and app.",
    audience: "Developers and designers welcome",
    applyBy: "15 May 2026",
    deadline: "May 15, 2026",
    type: "Contributors",
    status: "open",
    saved: false,
    applyUrl: "",
    summary:
      "Join the team building the Flutter Kanpur website and mobile app in the open.",
    about:
      "The community website and app are built by volunteers. Contributors pick up issues, ship features and learn modern web and Flutter practices while working with the core team.",
    whoCanApply:
      "Developers and designers at any level can apply. If you can use Git and want to learn by building, you are a good fit.",
    lookingFor:
      "Consistency, clean pull requests, and curiosity. We will help you get started with a good first issue.",
  },
];






// Dummy data for the mobile Contests screens
// (components/explorePageComponents/mobileScreen/contests).
// `endsInMs` is "time left" when the screen mounts; 

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;

// TODO: point these at the real contest / daily-problem pages once they exist.
export const contestRoutes = {
  detail: (id) => `/explore/contests/${id}`,
  dailyProblem: "/explore/contests/daily",
};

export const contestFilterChips = ["DSA", "Flutter", "UI/UX", "Web"];

export const contestsEmptyContent = {
  noContests: {
    title: "No contests available",
    description: "New contests will appear here once announced.",
    buttonLabel: "Solve today’s problem",
  },
  noResults: {
    title: "No contests found",
    description: "Try a different search or filter.",
  },
};

export const contests = [
  {
    id: 1,
    category: "DSA Challenge",
    title: "Weekly DSA coding sprint",
    tags: ["Beginner", "Online", "DSA"],
    categories: ["DSA"],
    endsInMs: 6 * DAY + 12 * HOUR + 54 * MINUTE,
    saved: false,
  },
  {
    id: 2,
    category: "DSA Challenge",
    title: "Weekly DSA coding sprint",
    tags: ["Beginner", "Online", "DSA"],
    categories: ["DSA"],
    endsInMs: 6 * DAY + 12 * HOUR + 54 * MINUTE,
    saved: false,
  },
  {
    id: 3,
    category: "Flutter Challenge",
    title: "Build a UI clone in 48 hours",
    tags: ["Intermediate", "Online", "Flutter"],
    categories: ["Flutter"],
    endsInMs: 2 * DAY + 3 * HOUR + 10 * MINUTE + 25 * 1000,
    saved: true,
  },
  {
    id: 4,
    category: "Design Challenge",
    title: "Redesign a community screen",
    tags: ["Beginner", "Online", "UI/UX"],
    categories: ["UI/UX"],
    endsInMs: 4 * DAY + 8 * HOUR,
    saved: false,
  },
];
