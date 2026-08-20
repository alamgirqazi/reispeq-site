import type { NextConfig } from "next";

/**
 * The site is built as a fully static export so it can be hosted anywhere —
 * GitHub Pages, Cloudflare Pages, S3, Netlify, or a plain nginx directory.
 * No Node server, no serverless functions, no vendor lock-in.
 *
 * BASE_PATH is only needed when deploying to a GitHub *project* page
 * (https://user.github.io/repo). Leave it unset for a custom domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
