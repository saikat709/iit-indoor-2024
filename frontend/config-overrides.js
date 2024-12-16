module.exports = function override(config, env) {
    // Remove the ManifestPlugin
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ManifestPlugin'
    );
    return config;
  };
  