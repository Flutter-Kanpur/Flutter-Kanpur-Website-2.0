// Content + data for the Community page middle section (Forum Discussions,
// Conversations, Badges & Leaderboard, Meet the Team, Built on Respect).



export const forumDiscussionsTimeline = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet ipsum dolor sit amet",
    author: "Angelica Singh",
    date: "05 April 2025",
    badge: "Most active",
    body: "At Hashnode, we want to help you build docs and blogs that are highly customizable, follow accessibility standards, and offer a great developer experience. We have been adding features and enhancements every week that focus on helping you build effective docs and blogs.",
    highlightsLabel: "This week, we worked on:",
    highlights: [
      "Adding steps component to Hashnode's docs product.",
      "Accessibility improvements on Hashnode's blog starter kit.",
    ],
  },
  {
    id: 2,
    author: "Angelica Singh",
    date: "05 April 2025",
    body: "At Hashnode, we want to help you build docs and blogs that are highly customizable, follow accessibility standards, and offer a great developer experience. We have been adding features and enhancements every week that focus on helping you build effective docs and blogs.",
  },
  {
    id: 3,
    author: "Angelica Singh",
    date: "05 April 2025",
    body: "At Hashnode, we want to help you build docs and blogs that are highly customizable, follow accessibility standards, and offer a great developer experience.",
  },
];



export const conversationFeatures = [
  { id: 1, title: "Ask questions and share solutions", area: "ask" },
  { id: 2, title: "Reply, upvote, and engage", area: "reply" },
  { id: 3, title: "Start or join discussions", area: "start" },
  { id: 4, title: "Explore trending and active topics", area: "explore" },
];



export const badgeCategories = [
  {
    id: "daily",
    label: "Daily practice badges",
    badges: [
      { id: 1, earned: true },
      { id: 2, earned: true },
      { id: 3, earned: true },
      { id: 4, earned: false },
      { id: 5, earned: false },
    ],
  },
  {
    id: "contribution",
    label: "Contribution badges",
    badges: [
      { id: 1, earned: false },
      { id: 2, earned: false },
      { id: 3, earned: false },
    ],
  },
  {
    id: "milestone",
    label: "Community milestone badges",
    badges: [
      { id: 1, earned: false },
      { id: 2, earned: false },
      { id: 3, earned: false },
    ],
  },
  {
    id: "participation",
    label: "Participation badges",
    badges: [
      { id: 1, earned: false },
      { id: 2, earned: false },
      { id: 3, earned: false },
    ],
  },
];





export const teamClusters = [
  {
    id: "A",
    aspectRatio: 714 / 488,
    flexGrow: 1.65,
    members: [
      {
        id: 1,
        image: "https://i.pravatar.cc/300?img=11",
        rect: { left: 1.54, top: 12.91, width: 15.69, height: 22.95 },
        rotate: 4,
        z: 2,
        badge: "check",
        badgeColor: "primary",
        
      },
      {
        id: 2,
        image: "https://i.pravatar.cc/300?img=47",
        rect: { left: 40.48, top: 29.1, width: 21.71, height: 29.1 },
        rotate: 7,
        z: 1,
      },
      {
        id: 3,
        image: "https://i.pravatar.cc/300?img=33",
        rect: { left: 22.55, top: 43.65, width: 30.95, height: 35.86 },
        rotate: 2,
        z: 2,
        tag: { role: "Flutter developer", name: "Lorem Ipsum", accent: "violet", value: "R" },
        tagPos: { left: 0, top: 82.99 },
      },
      {
        id: 4,
        image: "https://i.pravatar.cc/300?img=68",
        rect: { left: 77.18, top: 66.6, width: 19.19, height: 29.71 },
        rotate: 3,
        z: 1,
      },
    ],
  },
  {
    id: "B",
    aspectRatio: 433 / 443,
    flexGrow: 1,
    members: [
      {
        id: 5,
        image: "https://i.pravatar.cc/300?img=26",
        rect: { left: 0, top: 0, width: 62.36, height: 53.05 },
        rotate: 2,
        z: 1,
        badge: "check",
        badgeColor: "success",
        tag: { role: "Web developer", name: "Lorem Ipsum", accent: "pending", value: "P" },
        tagPos: { left: -60, top: 0 },
      },
      {
        id: 6,
        image: "https://i.pravatar.cc/300?img=15",
        rect: { left: 33.49, top: 34.99, width: 66.51, height: 65.01 },
        rotate: 0,
        z: 2,
        badge: "plus",
        badgeColor: "primary",
        
      },
    ],
  },
  {
    id: "C",
    aspectRatio: 613 / 482,
    flexGrow: 1.42,
    members: [
      {
        id: 7,
        image: "https://i.pravatar.cc/300?img=41",
        rect: { left: -7, top: 11.41, width: 35.4, height: 43.15 },
        rotate: 2,
        z: 2,
        badge: "check",
        badgeColor: "success",
      },
      {
        id: 8,
        image: "https://i.pravatar.cc/300?img=24",
        rect: { left: 26.43, top: 0, width: 19.41, height: 23.86 },
        rotate: 6,
        z: 1,
      },
      {
        id: 9,
        image: "https://i.pravatar.cc/300?img=53",
        rect: { left: 80, top: 3.86, width: 21.21, height: 25.31 },
        rotate: 3,
        z: 3,
        badge: "plus",
        badgeColor: "primary",
      },
      {
        id: 10,
        image: "https://i.pravatar.cc/300?img=32",
        rect: { left: 28.65, top: 54.77, width: 40.29, height: 45.23 },
        rotate: 1,
        z: 3,
        badge: "plus",
        badgeColor: "primary",
        tag: { role: "Web Designer", name: "Lorem Ipsum", accent: "primary", icon: "timer" },
        tagPos: { left: 60.9, top: 90.02 },
      },
    ],
  },
];




