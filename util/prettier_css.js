const pkg = require('../package.json') || {};
const fs = require('fs');

const postcss = require('postcss');
const cssDeclarationSorter = require('css-declaration-sorter');
const cssPrettify = require('postcss-prettify');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

const files = process.argv.slice(2);

const vueFileNameRegex = /\.vue$/;
const cssFileNameRegex = /\.[s]*css$/;
let source;
let cssRegex;
let sourceMatch;
let matchGroup;

for (let file of files) {
  source = fs.readFileSync(file, 'utf8');

  let isVue = vueFileNameRegex.test(file);
  let plugins = [
    cssDeclarationSorter({ order: 'concentric-css' }),
    cssPrettify()
  ];

  if (isVue) {
    cssRegex = /(<style>)([\s\S]*)(<\/style>)/gm;
    matchGroup = 2;
    plugins.push(stylelint());
  } else if (cssFileNameRegex.test(file)) {
    cssRegex = /([\s\S]*)/gm;
    matchGroup = 1;
  } else {
    process.exit();
  }
  plugins.push(reporter({ clearReporterMessages: true }));
  sourceMatch = cssRegex.exec(source);

  postcss(plugins)
    .process(sourceMatch[matchGroup])
    .then(tmpresult => {
      let result;
      if (isVue) {
        result = source.replace(cssRegex, '$1\n' + tmpresult.css + '$3');
      } else {
        result = tmpresult.css;
      }
      fs.writeFileSync(file, result, { encoding: 'utf8' });
    });
}
