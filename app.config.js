require('dotenv').config();
// ...existing code...
module.exports = (ctx) => {
  // ctx may be undefined or may be the object { config }
  const config = (ctx && ctx.config) || ctx || {};

  return {
    ...config,
    extra: {
      // prefer .env, fallback to any existing config.extra, then a safe default
      BASE_IP:
        process.env.BASEIP ??
        config.extra?.BASE_IP ??
        config.extra?.BASEIP ??
        "192.168.1.12",
    },
    // make sure eas.projectId is always defined (can read from env too)
    eas: {
      projectId:
        process.env.EAS_PROJECT_ID ?? "ed1b5568-6279-4565-8f9e-37d2ae855ed9",
    },
  };
};
// ...existing code...