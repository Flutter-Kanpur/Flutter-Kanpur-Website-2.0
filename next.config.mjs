/** @type {import('next').NextConfig} */

// Upstream readme/blogs app — already served with basePath `/blogs`.
// Override with BLOGS_UPSTREAM_URL in .env.local if needed.
const BLOGS_UPSTREAM =
  process.env.BLOGS_UPSTREAM_URL?.replace(/\/$/, "") ||
  "https://readme.flutterkanpur.in/blogs";

const nextConfig = {
  reactCompiler: true,

  /**
   * Super-app style path proxy:
   *   /blogs        → https://readme.flutterkanpur.in/blogs
   *   /blogs/:path* → https://readme.flutterkanpur.in/blogs/:path*
   *
   * Address bar stays on this domain; Blog stays a separate deploy.
   */
  async rewrites() {
    return [
      {
        source: "/blogs",
        destination: `${BLOGS_UPSTREAM}`,
      },
      {
        source: "/blogs/:path*",
        destination: `${BLOGS_UPSTREAM}/:path*`,
      },
    ];
  },
};

export default nextConfig;
