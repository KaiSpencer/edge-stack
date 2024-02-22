import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "Edge Stack",
  description: "Full Stack on the Edge Runtime",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/getting-started/about" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsed:false,
        items: [
          { text: "About", link: "/getting-started/about" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/KaiSpencer/edge-stack" },
    ],
  },
});
