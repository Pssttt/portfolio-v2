/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/tech-stack", destination: "/stack", permanent: true },
      { source: "/github", destination: "/projects", permanent: true },
      { source: "/admin/:path+", destination: "/admin", permanent: false },
    ];
  },
};

export default nextConfig;
