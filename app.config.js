

module.exports = (ctx = {}) => {
  const config = ctx.config ?? ctx ?? {};

  const BASE_IP =
    process.env.BASEIP ??
    process.env.BASE_IP ??
    config.extra?.BASE_IP ??
    config.extra?.BASEIP ??
    "192.168.0.111";

  return {
    ...config,
    plugins: [...(config.plugins || []), "expo-font", "expo-secure-store"],
    extra: {
      ...(config.extra || {}),
      BASE_IP,
    },
  };
};