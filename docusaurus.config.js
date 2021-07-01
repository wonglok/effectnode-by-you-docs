const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Effect Node by You",
  tagline: "VFX Website Boilerplate with Visual Programming & more...",
  url: "https://wonglok.github.io/",
  trailingSlash: true,
  baseUrl: "/effectnode-by-you-docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "wonglok", // Usually your GitHub org/user name.
  projectName: "effectnode-by-you-docs", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Effect Node",
      logo: {
        alt: "Effect Node by You!",
        src: "img/en-logo-whitebg.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Quick Start Docs",
        },
        // {
        //   to: "/vp-api",
        //   label: "Visual Programming APIs",
        //   position: "left",
        // },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://github.com/wonglok/effectnode-by-you",
          label: "Download on Github",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs & API References",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Effect Node Links",
          items: [
            {
              label: "EffectNode Main Site",
              href: "https://effectnode.com",
            },
            {
              label: "Party at Discord",
              href: "https://discord.gg/ukTwVYbUs",
            },
            {
              label: "Inventor's Twitter",
              href: "https://twitter.com/wonglok831",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/wonglok/effectnode-by-you",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wong Lok. Thank you Jesus for all your heavenly inspiration, prototyped since 2018 with love and joy. `,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
