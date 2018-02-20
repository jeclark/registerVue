import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      entries: []
    },
    mutations: {
      SET_ENTRIES(state, data) {
        state.entries = data.data;
      }
    },
    getters: {
      sorted_entries(state) {
        var sortedEntries = state.entries;
        return sortedEntries.reverse();
      }
    }
  });
};

export default createStore;
