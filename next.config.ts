import type { NextConfig } from "next";
import { WATERMARK_QUERY } from "./src/lib/watermark-version";

const nextConfig: NextConfig = {
  images: {
    // Next 16 exige declarar las rutas locales con query string.
    localPatterns: [
      { pathname: "/assets/images/**", search: "" },
      { pathname: "/api/property-image/**", search: WATERMARK_QUERY },
      { pathname: "/api/property-cover/**", search: WATERMARK_QUERY },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "propiedades.reynosobienesraices.com.ar",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
