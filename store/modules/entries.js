import axios from 'axios';
import moment from 'moment';
// initial state
export const state = () => ({
  entries: []
});

// getters
const getters = {
  return_sorted_entries: (state, getters) => {
    // this really should be a date sort
    // console.log('return_sorted_entries state is ', state.entries);
    if (state.entries !== undefined) {
      var sortedEntries = state.entries.slice(
        Math.max(state.entries.length - 100, 1)
      );
      // console.log('sorted entries are ', sortedEntries.reverse());
      return sortedEntries.reverse();
    } else {
      return [];
    }
  },
  return_total: (state, getters) => {
    // console.log('return_total state is ', state.entries);
    if (state.entries !== undefined && state.entries.length > 0) {
      // console.log('Got entries!');
      var total = parseFloat(state.entries[0].amount);
      state.entries.reduce(function(entries, entry) {
        total = total + parseFloat(entry.amount);
      });
      return total.toFixed(2);
    } else {
      // console.log('No entries! BOOOOOOO!');
      return 0;
    }
  },
  return_cleared_total: (state, getters) => {
    // console.log('return_cleared_total state is ', state.entries);
    if (state.entries !== undefined && state.entries.length > 0) {
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
  },
  get_pie(state, getters) {
    // console.trace();
    var pieData = [];
    var outputData = [];
    var pastMonth = moment()
      .subtract(90, 'days')
      .format('YYYY-MM-DD');
    console.log('get_pie and entries are ', state.entries);
    if (state.entries.length > 0) {
      state.entries.reduce(function(entries, entry) {
        if (
          entry.tag != null &&
          entry.entrydate >= pastMonth &&
          entry.type === 'debit'
        ) {
          if (pieData[entry.tag] === undefined) {
            pieData[entry.tag] = Math.abs(parseFloat(entry.amount));
          } else {
            // console.log(pieData[entry.tag]);
            pieData[entry.tag] =
              pieData[entry.tag] + Math.abs(parseFloat(entry.amount));
          }
        }
      });
    }
    for (var key in pieData) {
      outputData.push({
        name: key,
        y: pieData[key]
      });
    }
    // console.log('output data is ', outputData);
    return outputData;
  }
};

// actions
// const actions = {
//   async getAllEntries({ commit }) {
//     // console.log('called getAllEntries');
//     await axios.get('http://simple-rest-api.dev/api/entry/').then(resp => {
//       // console.log('getAllEntries and data is ', resp.data);
//       commit('SET_ENTRIES', resp.data); // using response.data
//     });
//   }
// };

// mutations
const mutations = {
  SET_ENTRIES(state, data) {
    console.log('called SET_ENTRIES with ', data.data);
    state.entries = data.data;
    // console.log('store is set to ', state);
  }
};

export default {
  state,
  getters,
  mutations
};
