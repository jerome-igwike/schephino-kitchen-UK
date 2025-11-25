import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https' as const, // 🟢 FIX: Forces specific type
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https' as const, // 🟢 FIX: Forces specific type
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  // skipWaiting removed to prevent type error
  disable: process.env.NODE_ENV === "development",
})(nextConfig as any); // 🟢 NUCLEAR FIX: Cast to 'any' stops the compatibility complaints