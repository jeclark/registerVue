import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

import Index from './index.vue';

storiesOf('Index Page', module)
  .add('as a component', () => ({
    components: { Index },
    template: '<index></index>'
  }));
