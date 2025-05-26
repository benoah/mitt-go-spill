// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Dette er en vanlig innstilling, behold den eller tilpass etter behov
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "", // Tom streng for standard HTTPS-port (443)
        pathname: "/wikipedia/commons/**", // Tillater bilder fra /wikipedia/commons/ og undermapper
      },
      {
        // Lagt til for fallback-bildene dine
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**", // Tillater alle stier fra placehold.co
      },
      // Du kan legge til flere remotePatterns her for andre domener senere
    ],
  },
  // Andre Next.js-konfigurasjoner kan legges til her
};

module.exports = nextConfig;

// Hvis du bruker ES Modules (f.eks. hvis filen heter next.config.mjs), bruk:
// export default nextConfig;
