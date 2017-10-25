import Vue from 'vue';
import App from '~/pages/index';

describe('index.spec.js', () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(App); // Create a copy of the original component
    vm = new cmp({}).$mount(); // Instances and mounts the component
  });

  it('has an h1 with a title of "toolkit"', () => {
    expect(vm.$el.querySelector('h1.title').textContent)
      .toMatch(/^\s*toolkit\s*$/);
  });
});
