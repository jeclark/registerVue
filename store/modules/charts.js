import axios from 'axios';
import moment from 'moment';

export const state = () => ({
  pieData: [],
  entries: [],
  lineData: [],
  last12months: []
});
// getters
const getters = {
  get_lines(state, getters) {
    console.log('called get_lines', state.lineData);
    return state.lineData;
  },
  get_last_12_months(state, getters) {
    console.log('called get_last_12_months', state.last12months);
    return state.last12months;
  }
};

// actions
const actions = {
  async getLineData({ commit }) {
    commit('SET_LAST_TWELVE_MONTHS');
    axios
      .get('http://simple-rest-api.dev/api/entry/getTotalsByMonth', {
        crossdomain: true
      })
      .then(data => {
        // console.log('getLineData with ', data.data);
        var checkTag = '';
        var outputArray = [];
        var tempData = [];
        var range = moment()
          .startOf('month')
          .subtract(12, 'months')
          .format('YYYY-MM');
        for (var key in data.data.data) {
          // console.log('line is ', data.data.data[key]);
          // this is where we do our really dumb loop because highcharts data is silly
          // set the $checkTag to the tag of the first row
          if (data.data.data[key].tag !== checkTag) {
            // we have a new chect tag
            // do we have data?
            if (tempData.length !== 0) {
              outputArray.push({
                name: checkTag,
                data: tempData
              });
            }
            tempData = [];
            // console.log('new checkTag', data.data.data[key].tag);
            checkTag = data.data.data[key].tag;
          }
          if (data.data.data[key].yearMonth > range) {
            // these are the ones we care about
            tempData[data.data.data[key].month - 1] = Math.abs(
              data.data.data[key].total
            );
            // console.log('tempData is ', tempData);
          } else {
            // don't care about these
            // console.log('date is ', data.data.data[key].yearMonth);
          }
        }
        // console.log('outputArray is ', outputArray);
        commit('SET_LINE_DATA', outputArray); // using response.data
      });
  }
};

// mutations
const mutations = {
  SET_LINE_DATA(state, data) {
    console.log('SET_LINE_DATA with ', data);
    state.lineData = data;
  },
  SET_LAST_TWELVE_MONTHS(state) {
    // console.log('SET_LAST_TWELVE_MONTHS with ', state);
    var today = moment().startOf('month');
    var pastYear = [today.format('MMM')];
    for (var i = 1; i <= 11; i++) {
      pastYear.push(today.subtract(1, 'months').format('MMM'));
    }
    state.last12months = pastYear;
    console.log('last12months is ', state.last12months);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
