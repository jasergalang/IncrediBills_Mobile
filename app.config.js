// ...existing code...
require("dotenv").config();

module.exports = (ctx = {}) => {
  const config = ctx.config ?? ctx ?? {};

  const BASE_IP =
    process.env.BASEIP ??
    process.env.BASE_IP ??
    config.extra?.BASE_IP ??
    config.extra?.BASEIP ??
    "192.168.1.9";

  const EAS_PROJECT_ID =
    "";

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