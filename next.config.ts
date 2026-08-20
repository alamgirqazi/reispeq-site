import type { NextConfig } from "next";
import { normaliseBasePath } from "./src/lib/base-path";

/**
 * The site is built as a fully static export so it can be hosted anywhere —
 * GitHub Pages, Cloudflare Pages, S3, Netlify, or a plain nginx directory.
 * No Node server, no serverless functions, no vendor lock-in.
 */
const basePath = normaliseBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
