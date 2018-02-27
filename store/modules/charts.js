import axios from 'axios';
import moment from 'moment';

const state = {
  pieData: [],
  entries: []
};
// getters
const getters = {
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
    console.log('called get_lines');
  }
};

// actions
const actions = {
  async getLineData({ commit }) {
    axios
      .get('http://simple-rest-api.dev/api/entry/getTotalsByMonth', {
        crossdomain: true
      })
      .then(data => {
        commit('SET_LINE_DATA', data.data); // using response.data
      });
  }
};

// mutations
const mutations = {
  SET_LINE_DATA(state, data) {
    state.lineData = data;
  }
};

export default {
  getters,
  actions,
  mutations
};
