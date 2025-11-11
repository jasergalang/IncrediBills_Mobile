// ...existing code...
require("dotenv").config();

module.exports = (ctx = {}) => {
  const config = ctx.config ?? ctx ?? {};

  const BASE_IP =
    process.env.BASEIP ??
    process.env.BASE_IP ??
    config.extra?.BASE_IP ??
    config.extra?.BASEIP ??
    "192.168.1.12";

  const EAS_PROJECT_ID =
    process.env.EAS_PROJECT_ID ??
    config.eas?.projectId ??
    "c3d8c275-93c0-4031-9eb7-f65cc22ddb91";

  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      BASE_IP,
    },
    eas: {
      ...(config.eas || {}),
      projectId: EAS_PROJECT_ID,
    },
  };
};
// ...existing code...P