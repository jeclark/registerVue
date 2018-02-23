import Vuex from 'vuex';
import moment from 'moment';

const createStore = () => {
  return new Vuex.Store({
    state: {
      entries: [],
      lineData: []
    },
    mutations: {
      SET_ENTRIES(state, data) {
        state.entries = data;
      },
      SET_LINE_DATA(state, data) {
        state.lineData = data;
      }
    },
    getters: {
      sorted_entries(state) {
        // this really should be a date sort
        var sortedEntries = state.entries.slice(
          Math.max(state.entries.length - 100, 1)
        );
        return sortedEntries.reverse();
      },
      get_total(state) {
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
      get_cleared_total(state) {
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
      },
      get_pie(state) {
        var pieData = [];
        var outputData = [];
        var pastMonth = moment()
          .subtract(30, 'days')
          .format('YYYY-MM-DD');
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
        return outputData;
      },
      get_lines(state) {
        const tags = [
          'groceries',
          'gas',
          'entertainment',
          'utilities',
          'woodworking',
          'restaurant'
        ];
      }
    }
  });
};

export default createStore;
