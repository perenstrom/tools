module.exports = {
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/qr',
        permanent: false
      }
    ];
  }
};
