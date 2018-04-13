import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import entries from './modules/entries';

Vue.use(Vuex);

const entryStore = () => {
  return new Vuex.Store({
    modules: {
      entries: entries
    },
    mutations: {
      DO_STUFF: function() {
        console.log('arguments are ', arguments);
      }
    }
  });
};
