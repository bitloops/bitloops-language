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
        routeBasePath: 'bitloops-language', // Adjusted
        sidebarPath: require.resolve('./sidebarsBitloops.js'),
        // editUrl: 'https://github.com/bitloops/bitloops-language/edit/main/documentation',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'design-2-code',
        path: 'docs/design-2-code',
        routeBasePath: 'design-2-code', // Adjusted
        sidebarPath: require.resolve('./sidebarsDesign2Code.js'),
        // disableVersioning: true, // optional, based on your preference
        // You might want to add an edit URL for design-2-code as well
      },
    ],
    // ... other plugins you might have
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


