module.exports = (api) => {
    // This caches the Babel config
    console.log('procesando babel' + process.env.NODE_ENV)
    api.cache.using(() => process.env.NODE_ENV);
    return {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      // Applies the react-refresh Babel plugin on non-production modes only
    };
};