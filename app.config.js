require('dotenv').config();
// ...existing code...
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
    config.extra?.eas?.projectId ??
    "ed1b5568-6279-4565-8f9e-37d2ae855ed9";

  return {
    ...config,
    plugins: [...(config.plugins || []), "expo-font"],
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
// ...existing code...