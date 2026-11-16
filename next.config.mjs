/** @type {import('next').NextConfig} */

// Upstream readme/blogs app — already served with basePath `/blogs`.
// Override with BLOGS_UPSTREAM_URL in .env.local if needed.
const BLOGS_UPSTREAM =
  process.env.BLOGS_UPSTREAM_URL?.replace(/\/$/, "") ||
  "https://readme.flutterkanpur.in/blogs";

const nextConfig = {
  reactCompiler: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wwbfhfkuaaebbfjqgddo.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

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
