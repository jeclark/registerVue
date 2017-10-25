const path = require('path');

module.exports = (baseCfg, configType) => {


  baseCfg.resolve.alias['~'] = path.resolve(__dirname, '../');

  /* baseCfg.resolve = {
    extensions: ['', '.js', '.vue'],
    alias: {
      '~/': path.resolve(__dirname, '../')
    }
  }; */
  return baseCfg;

};
