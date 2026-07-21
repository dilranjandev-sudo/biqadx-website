/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // --- Deployment path ---
  // Default = Path A (Hostinger Node.js hosting): full Next.js server with SSR
  // and the /api/contact route handling the form server-side.
  //
  // To switch to Path B (static export for basic shared hosting):
  //   1. set `output: 'export'` below,
  //   2. remove app/api/contact (static export drops API routes),
  //   3. point the contact form at a third-party service (e.g. Formspree).
  //
  // output: 'export',
  // Static generation forks one worker per core. On a low-RAM machine that many
  // concurrent Node processes exhausts system memory and the build dies with
  // "Zone Allocation failed" long before any single heap is full. Two workers
  // build all 32 pages comfortably.
  experimental: {
    cpus: 2,
  },
  images: {
    // Enable when a Cloudinary MCP / account is wired in for image delivery:
    // remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
  // Superseded Rev2 routes → platform routes (Path A only; drop if static export).
  async redirects() {
    return [
      { source: "/technology", destination: "/metasurface-diagnostics", permanent: false },
      { source: "/opportunity", destination: "/", permanent: false },
      { source: "/company", destination: "/about", permanent: false },
      { source: "/work-with-us", destination: "/partners", permanent: false },
      { source: "/newsroom", destination: "/insights", permanent: false },
    ];
  },
};

export default nextConfig;
