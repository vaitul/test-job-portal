module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/test/jobs',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['logo.clearbit.com'],
  }
}
