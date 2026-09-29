import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GTM fires the Ads / GA4 / Meta lead tags only when the address bar
  // contains "/thank-you/" at the moment gtm.js loads. Keep that slash.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [{ source: "/:path*/", destination: "/:path*" }];
  },
};

export default nextConfig;
