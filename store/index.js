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
        const sortedEntries = state.entries.reverse();
        return sortedEntries;
      }
    }
  });
};

export default createStore;
