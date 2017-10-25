import Vue from 'vue';
import App from '~/pages/index';

describe('index.spec.js', () => {
  let AppTest, vm;

  beforeEach(() => {
    AppTest = Vue.extend(App); // Create a copy of the original component
    vm = new AppTest({}).$mount(); // Instances and mounts the component
  });

  it('has an h1 with a title of "toolkit"', () => {
    expect(vm.$el.querySelector('h1.title').textContent).toMatch(
      /^\s*toolkit\s*$/
    );
  });
});
