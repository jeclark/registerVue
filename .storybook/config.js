import { configure } from '@storybook/vue';

import Vue from 'vue';

const cmpDir = require.context('../components', true, /\.story\.js$/);
const pageDir = require.context('../pages', true, /\.story\.js$/);

function loadStories() {
  cmpDir.keys().forEach((filename) => cmpDir(filename));
  pageDir.keys().forEach((filename) => pageDir(filename));
}

configure(loadStories, module);
