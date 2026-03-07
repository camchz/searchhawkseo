const withSecurityHeaders = require('next-security-headers');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self';"
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];

module.exports = withSecurityHeaders({
  compress: true,
  async headers() {
    return [
      {
        // matching all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['example.com'], // Replace with your image domain
  },
  seo: {
    title: 'Search Hawk SEO',
    description: 'Optimize your search marketing strategy with Search Hawk SEO',
    keywords: ['SEO', 'Search', 'Marketing'],
    author: 'camchz',
  }
});