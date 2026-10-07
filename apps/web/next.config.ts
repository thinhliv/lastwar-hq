import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn5.telesco.pe" },
      { protocol: "https", hostname: "telesco.pe" },
      { protocol: "https", hostname: "api.telegram.org" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/downloads/Monica_Android_2309.apk",
        destination:
          "https://github.com/thinhliv/lastwar-hq/releases/download/v2309/Monica_Android_2309.apk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
