import { assets } from "./tokens";

const { banners } = assets;

export const forumContent = {
  backLabel: "Back",
  backHref: "/explore",
  title: "Forum Discussions",
  subtitle: "Participate in community discussions and knowledge sharing.",
  filtersLabel: "Filters",
  newDiscussionLabel: "Start a new discussion",
  relatedTitle: "More such discussions",
  responsesLabel: "Responses",
  replyPlaceholder: "Write a reply",
  replySubmitLabel: "Post reply",
  answersLabel: "answers",
  emptyTitle: "No discussions match this filter",
  emptyBody: "Try a different filter, or start the conversation yourself.",
};

export const newDiscussionForm = {
  heading: "Start a new discussion",
  titleLabel: "Question",
  titlePlaceholder: "What would you like to ask the community?",
  bodyLabel: "Details",
  bodyPlaceholder: "Add context so people can give you a useful answer.",
  tagsLabel: "Tags",
  tagsPlaceholder: "Comma separated, e.g. State management, Flutter",
  cancelLabel: "Cancel",
  submitLabel: "Post discussion",
};

export const quickFilters = [
  { label: "Trending", value: "trending" },
  { label: "Active", value: "active" },
  { label: "Unanswered", value: "unanswered" },
];

export const topicFilters = [
  { label: "All topics", value: "all" },
  { label: "State management", value: "State management" },
  { label: "Flutter development", value: "Flutter development" },
  { label: "UI / UX", value: "UI / UX" },
  { label: "Open source", value: "Open source" },
];

export const defaultAvatar = "/assets/explore-page-assets/avatar.svg";

const sam = { name: "Sam Sameul", avatar: defaultAvatar };
const pushti = { name: "Pushti Sonawala", avatar: defaultAvatar };

export const discussions = [
  {
    id: "state-management",
    title:
      "How to manage state efficiently in Flutter without overcomplicating the app?",
    tags: ["State management", "Flutter development"],
    body: "I'm building a medium-scale Flutter app and struggling to decide between Provider, Riverpod, or Bloc. I want something scalable but not overly complex. What would you recommend and why?",
    attachments: [
      { id: "a1", src: banners[0], alt: "Architecture comparison board" },
      { id: "a2", src: banners[1], alt: "Two ways to build the same screen" },
      { id: "a3", src: banners[2], alt: "Code sample" },
    ],
    author: sam,
    postedAt: "6h ago",
    trending: true,
    responses: [
      {
        id: "r1",
        author: sam,
        postedAt: "2h ago",
        text: "AI is taking the joy out of doing simple tasks, killing the planet in the process and we are the ones to blame for it. We project such an image of these tools like an image/video generation tool is going to give me a better quality of life.",
        likes: 45,
        comments: 7,
        liked: true,
      },
      {
        id: "r2",
        author: pushti,
        postedAt: "2h ago",
        text: "AI is taking the joy out of doing simple tasks, killing the planet in the process and we are the ones to blame.",
        likes: 49,
        comments: 3,
        liked: true,
      },
    ],
  },
  {
    id: "riverpod-testing",
    title:
      "What is the cleanest way to test Riverpod providers in a large codebase?",
    tags: ["State management", "Open source"],
    body: "Our test suite has grown past 400 cases and provider overrides are getting hard to follow. How are you structuring provider tests so they stay readable?",
    attachments: [],
    author: sam,
    postedAt: "6h ago",
    trending: true,
    responses: [
      {
        id: "r3",
        author: pushti,
        postedAt: "4h ago",
        text: "We keep one container factory per feature and override only what the test actually touches. It keeps the setup to two or three lines.",
        likes: 12,
        comments: 2,
        liked: true,
      },
    ],
  },
  {
    id: "responsive-layouts",
    title:
      "Best practices for responsive layouts across phone, tablet and web?",
    tags: ["UI / UX", "Flutter development"],
    body: "LayoutBuilder everywhere feels noisy. Is there a pattern people are happy with for sharing one widget tree across all three form factors?",
    attachments: [
      { id: "a4", src: banners[2], alt: "Responsive breakpoints sheet" },
      { id: "a5", src: banners[1], alt: "Tablet layout preview" },
    ],
    author: sam,
    postedAt: "6h ago",
    trending: true,
    responses: [
      {
        id: "r4",
        author: sam,
        postedAt: "5h ago",
        text: "Define breakpoints once, expose them through an InheritedWidget, and let each screen ask for the current size class instead of measuring itself.",
        likes: 21,
        comments: 4,
        liked: true,
      },
    ],
  },
  {
    id: "first-contribution",
    title:
      "How do I make my first open source contribution to a Flutter package?",
    tags: ["Open source"],
    body: "I know Dart well enough but I've never opened a pull request on someone else's repository. Where is a good place to start?",
    attachments: [],
    author: sam,
    postedAt: "6h ago",
    trending: true,
    responses: [],
  },
  {
    id: "design-tokens",
    title: "Is it worth building a design token layer before the app grows?",
    tags: ["UI / UX", "State management"],
    body: "We keep repeating the same paddings and colours across screens. Curious whether teams here centralised these early or refactored later.",
    attachments: [],
    author: pushti,
    postedAt: "8h ago",
    trending: true,
    responses: [],
  },
  {
    id: "package-versioning",
    title:
      "How do you keep package versions in sync across a Flutter monorepo?",
    tags: ["Open source", "Flutter development"],
    body: "Melos handles most of it, but our CI still drifts every few weeks. Curious what has worked for other teams here.",
    attachments: [],
    author: pushti,
    postedAt: "1d ago",
    trending: false,
    responses: [
      {
        id: "r5",
        author: sam,
        postedAt: "20h ago",
        text: "Pin the shared deps in one workspace file and let every package inherit from it. CI only checks that nothing overrides the pin.",
        likes: 8,
        comments: 1,
        liked: false,
      },
    ],
  },
];
