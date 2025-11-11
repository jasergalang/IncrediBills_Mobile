
require('dotenv').config();

module.exports = ({ config }) => ({
  ...config,
  extra: {
    BASE_IP: process.env.BASEIP,
  },
});
