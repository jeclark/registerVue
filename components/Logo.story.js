import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

import Logo from './Logo.vue';

storiesOf('Logo', module).add('as a component', () => ({
  components: { Logo },
  template: '<logo></logo>'
}));
