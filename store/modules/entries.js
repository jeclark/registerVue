import moment from 'moment';
import _ from 'lodash';
// initial state
export const state = () => ({
  entries: []
});

const computed = {
  pieData() {
    // console.trace();
    var pieData = [];
    var outputData = [];
    var pastMonth = moment()
      .subtract(90, 'days')
      .format('YYYY-MM-DD');
    console.log('get_pie and entries are ', this.state.entries);
    if (this.state.entries.length > 0) {
      this.state.entries.reduce(function(entries, entry) {
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
    console.log('In pieData and output data is ', outputData);
    return outputData;
  }
};

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

// mutations
const mutations = {
  SET_ENTRIES(state, data) {
    console.log('called SET_ENTRIES with ', data.data);
    state.entries = data.data;
    // console.log('store is set to ', state);
  },
  UPDATE_ENTRY(state, data) {
    console.log('called UPDATE_ENTRY with ', state, data);
    console.log('entry is  ', state.entries[data.id]);
    var index = _.findIndex(state.entries, function(o) {
      return o.id === data.id;
    });
    console.log('index is ', index);
    console.log('entry is ', state.entries[index]);
    state.entries[index].cleared = data.cleared; // this should set to 1 or 0
    state.entries[index].payee = data.payee;
    state.entries[index].amount = data.amount; // this should know when it's negative or positive
    state.entries[index].entrydate = data.entrydate;
    state.entries[index].tag = data.tag;
    state.entries[index].type = data.type;
    // console.log('store is set to ', state);
  },
  INSERT_ENTRY(state, data) {
    console.log('called INSERT_ENTRY with ', state, data);
    var entry = [];
    entry.cleared = data.cleared; // this should set to 1 or 0
    entry.payee = data.payee;
    entry.amount = data.amount; // this should know when it's negative or positive
    entry.entrydate = data.entrydate;
    entry.tag = data.tag;
    entry.type = data.type;
    state.entries.push(entry);
    // console.log('store is set to ', state);
  },
  DELETE_ENTRY(state, data) {
    console.log('called DELETE_ENTRY with ', state, data);
    console.log('entry is  ', state.entries[data.id]);
    var index = _.findIndex(state.entries, function(o) {
      return o.id === data.id;
    });
    console.log('index is ', index);
    console.log('entry is ', state.entries[index]);
    state.entries.splice(index, 1);
  }
};

export default {
  state,
  computed,
  getters,
  mutations
};
