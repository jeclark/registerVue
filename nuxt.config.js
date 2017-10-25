let postcss, babel;
const pkg = require('./package.json');

if (process.env.NODE_ENV !== 'production') {
  postcss = [
    require('postcss-normalize')({ browserslist: pkg.browsersList }),
    require('postcss-cssnext')({ browsers: pkg.browsersList }),
    require('css-declaration-sorter')({ order: 'concentric-css' }),
    require('postcss-custom-media')(),
    require('postcss-prettify')()
  ];
  babel = {
    presets: ["vue-app"]
  };
} else {
  postcss = [
    require('postcss-normalize')({ browserslist: pkg.browsersList }),
    require('postcss-cssnext')({ browsers: pkg.browsersList }),
    require('css-declaration-sorter')({ order: 'concentric-css' }),
    require('postcss-custom-media')(),
    require('css-mqpacker')()
  ];
  babel = {
    presets: ["vue-app"],
    plugins: [
      [
        "groundskeeper-willie",
        { removeConsole: true, removeDebugger: true, removePragma: true }
      ]
    ]
  };
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '12ftguru Vue Starter'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    postcss,
    babel,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
