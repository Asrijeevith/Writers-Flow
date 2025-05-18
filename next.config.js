const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.cache = false; // Disable Webpack persistent caching
    return config;
  },
};

export default nextConfig; // ✅ Use ESM syntax

