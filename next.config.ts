import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence the Turbopack conflict
  turbopack: {}, 

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

// Wrap the config with PWA
export default withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig as any);