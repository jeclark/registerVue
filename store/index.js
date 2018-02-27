import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import entries from './modules/entries';
import charts from './modules/charts';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    modules: {
      entries,
      charts
    }
  });
};
