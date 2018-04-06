import moment from 'moment';
import _ from 'lodash';
// initial state
export const state = () => ({
  entries: []
});

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
  mutations
};
