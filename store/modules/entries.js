import axios from 'axios';
// initial state
const state = {
  entries: []
};

// getters
const getters = {
  return_sorted_entries() {
    // this really should be a date sort
    console.log('state is ', state);
    var sortedEntries = state.entries.slice(
      Math.max(state.entries.length - 100, 1)
    );
    return sortedEntries.reverse();
  },
  return_total(state) {
    // console.log('gt', state.entries.length);
    if (state.entries.length > 0) {
      var total = parseFloat(state.entries[0].amount);
      state.entries.reduce(function(entries, entry) {
        total = total + parseFloat(entry.amount);
      });
      return total.toFixed(2);
    } else {
      return 0;
    }
  },
  return_cleared_total(state) {
    if (state.entries.length > 0) {
      var total = parseFloat(state.entries[0].amount);
      state.entries.reduce(function(entries, entry) {
        if (entry.cleared === '1') {
          total = total + parseFloat(entry.amount);
        }
      });
      return total.toFixed(2);
    } else {
      return 0;
    }
  }
};

// actions
const actions = {
  getAllEntries({ commit }) {
    console.log('called getAllEntries');
    axios
      .get('http://simple-rest-api.dev/api/entry/', { crossdomain: true })
      .then(data => {
        commit('SET_ENTRIES', data.data); // using response.data
      });
  }
};

// mutations
const mutations = {
  SET_ENTRIES(state, data) {
    console.log('called SET_ENTRIES with ', state, data.data);
    state.entries = data.data;
  }
};

export default {
  getters,
  actions,
  mutations
};
