// Content + data for the Projects section on the Explore page.
// Edit the text/values here — the components render whatever lives in this file.

export const projectsContent = {
  heading: "Learn from Outstanding Community Projects",
  subheading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.",
  ctaLabel: "View all projects",
  ctaHref: "/projects",
};

const sampleProject = {
  title: "HealthSync — Fitness Dashboard",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  tags: ["Chart.js", "Figma", "Aabcd"],
  date: "03 Apr 2025",
  author: "Arjun Rao",
  href: "#",
};

export const projects = [
  { id: 1, ...sampleProject },
  { id: 2, ...sampleProject },
  { id: 3, ...sampleProject },
  { id: 4, ...sampleProject },
];
