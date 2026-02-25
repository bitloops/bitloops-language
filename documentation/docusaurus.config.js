// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  title: 'Bitloops Docs',
  url: 'https://bitloops.com',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'bitloops',
  projectName: 'bitloops-docs',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      ({
        docs: false, // Disable the default docs plugin
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-80ZXP154J5',
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bitloops-language',
        path: 'docs/bitloops-language',
        routeBasePath: 'bitloops-language',
        sidebarPath: require.resolve('./sidebarsBitloops.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'frontend-copilot',
        path: 'docs/frontend-copilot',
        routeBasePath: 'frontend-copilot',
        sidebarPath: require.resolve('./sidebarsFrontendCopilot.js'),
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Documentation',
      logo: {
        alt: 'Bitloops Logo',
        src: 'img/Bitloops-Logo.svg',
      },
      items: [
        {
          href: 'https://bitloops.com',
          label: 'Home',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear() > 2022 ? "2022 - " + new Date().getFullYear() : new Date().getFullYear()} Bitloops S.A.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;


