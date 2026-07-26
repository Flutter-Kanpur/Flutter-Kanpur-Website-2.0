// Content for the "Explore top categories" section as shown on the Explore page.
// The shared ExploreCategoriesSection component accepts these as props, so the
// landing page keeps its own defaults and is unaffected.

export const exploreCategoriesContent = {
  // The title renders in two tones: `title` (black) then `titleHighlight` (blue).
  title: "Read success stories",
  titleHighlight: "from our Members.",
  categories: [
    { title: "UI/UX Design", linkText: "Open full story", linkHref: "#" },
    { title: "Kubernetes", linkText: "Open full story", linkHref: "#" },
    { title: "UI/UX Design", linkText: "Open full story", linkHref: "#" },
  ],
};
