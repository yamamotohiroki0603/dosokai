import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/v1", destination: "/", permanent: true },
      { source: "/v2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
