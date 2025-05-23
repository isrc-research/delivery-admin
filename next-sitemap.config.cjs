/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://khajuramun.digprofile.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*', '/server/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://khajuramun.digprofile.com'}/sitemap-index.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Add locale alternates to URLs
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://khajuramun.digprofile.com'}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://khajuramun.digprofile.com'}/ne`,
      hreflang: 'ne',
    },
  ],
};