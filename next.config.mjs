import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      { source: "/docs", destination: "/docs/fundamentos", permanent: false },
      { source: "/fundamentos", destination: "/docs/fundamentos", permanent: true },
      { source: "/visual", destination: "/docs/visual", permanent: true },
      { source: "/interaccion", destination: "/docs/interaccion", permanent: true },
      { source: "/contenido", destination: "/docs/contenido", permanent: true },
      { source: "/desarrollo", destination: "/docs/desarrollo", permanent: true },
      { source: "/proceso-de-diseno", destination: "/docs/proceso-de-diseno", permanent: true },
      { source: "/recursos", destination: "/docs/recursos", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
