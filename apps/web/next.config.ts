import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
