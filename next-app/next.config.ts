import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/uc/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/thumbnail**",
      },
      {
        protocol: "https",
        hostname: "onedrive.live.com",
        port: "",
        pathname: "/download**",
      },
      {
        protocol: "https",
        hostname: "onedrive.live.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "1drv.ms",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.1drv.ms",
        port: "",
      },
      {
        protocol: "https",
        hostname: "scontent.fmnl8-3.fna.fbcdn.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
