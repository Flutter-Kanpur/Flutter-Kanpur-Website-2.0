import { redirect } from "next/navigation";

// /community is now the single, responsive Community page (mobile layout
// below the md breakpoint, desktop layout above it) — this route just
// forwards here so any existing links to /communityPage keep working.
export default function CommunityPageRedirect() {
  redirect("/community");
}
