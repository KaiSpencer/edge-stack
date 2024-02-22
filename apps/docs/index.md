---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Edge Stack"
  text: "Full Stack on the Edge Runtime"
  tagline: Built on Cloudflare
  image:
    src: /cloudflare.jpeg
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/about
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Workers
    details: Edge api built with Hono
    icon: 
      src: /workers.svg
      width: 100
  - title: Pages
    details: Remix app with RPC to the API. Docs site built with VitePress
    icon: 
      src: /pages.svg
      width: 100
  - title: D1
    details: Sqlite running on D1
    icon: 
      src: /public/d1.svg
      width: 180
---

