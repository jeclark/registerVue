import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import EventBus from '~/components/EventBus.vue'; // needed to update charts

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      DO_STUFF: function() {
        console.log('arguments are ', arguments);
      },
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
        console.log('UPDATE_ENTRY and data.cleared is ', data.cleared);
        if (data.type === 'debit') {
          data.amount = -Math.abs(data.amount);
        }
        state.entries[index].cleared = data.cleared; // this should set to 1 or 0
        state.entries[index].payee = data.payee;
        state.entries[index].amount = data.amount; // this should know when it's negative or positive
        state.entries[index].entrydate = data.entrydate;
        state.entries[index].tag = data.tag;
        state.entries[index].type = data.type;
        // console.log('store is set to ', state);
        EventBus.$emit('save', this.entryitem);
      },
      INSERT_ENTRY(state, data) {
        console.log('called INSERT_ENTRY with ', state, data);
        var entry = [];
        if (data.type === 'debit') {
          data.amount = -Math.abs(data.amount);
        }
        entry.cleared = data.cleared; // this should set to 1 or 0
        entry.payee = data.payee;
        entry.amount = data.amount; // this should know when it's negative or positive
        entry.entrydate = data.entrydate;
        entry.tag = data.tag;
        entry.type = data.type;
        state.entries.push(entry);
        EventBus.$emit('save', this.entryitem);
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
    }
  });
};

export default createStore;
