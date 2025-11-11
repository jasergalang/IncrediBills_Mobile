require("dotenv").config();

module.exports = ({ config }) => ({
  ...config,
  projectId: "c3d8c275-93c0-4031-9eb7-f65cc22ddb91",
  extra: {
    BASE_IP: process.env.BASEIP,
    eas: {
      projectId: "c3d8c275-93c0-4031-9eb7-f65cc22ddb91",
    },
  },
});
