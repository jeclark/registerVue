import axios from 'axios';
import moment from 'moment';
import https from 'https';

export const state = () => ({
  lineData: [],
  last12months: []
});
// getters
const getters = {
  get_lines(state, getters) {
    console.log('called get_lines with state', state.lineData);
    var checkTag = '';
    var outputArray = [];
    var tempData = [];
    var range = moment()
      .startOf('month')
      .subtract(12, 'months')
      .format('YYYY-MM');
    for (var key in state.lineData) {
      // console.log('line is ', data.data.data[key]);
      // this is where we do our really dumb loop because highcharts data is silly
      // set the $checkTag to the tag of the first row
      if (state.lineData[key].tag !== checkTag) {
        // we have a new check tag
        // do we have data?
        if (tempData.length !== 0) {
          outputArray.push({
            name: checkTag,
            data: tempData
          });
        }
        tempData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // console.log('new checkTag', data.data.data[key].tag);
        checkTag = state.lineData[key].tag;
      }
      if (state.lineData[key].yearMonth > range) {
        // these are the ones we care about
        tempData[state.lineData[key].month - 1] = Math.abs(
          state.lineData[key].total
        );
        // console.log('tempData is ', tempData);
      } else {
        // don't care about these
        // console.log('date is ', data.data.data[key].yearMonth);
      }
    }
    // console.log('outputArray is ', outputArray);
    console.log('called get_lines returned ', outputArray);
    return outputArray;
  },
  get_months(state, getters) {
    console.log('called get_months', state.last12months);
    return state.last12months;
  }
};

// mutations
const mutations = {
  SET_LINE_DATA(state, data) {
    console.log('SET_LINE_DATA with ', data.data);
    state.lineData = data.data;
  },
  SET_LAST_TWELVE_MONTHS(state) {
    // console.log('SET_LAST_TWELVE_MONTHS with ', state);
    var today = moment().startOf('month');
    var pastYear = [today.format('MM YYYY')];
    for (var i = 1; i <= 11; i++) {
      pastYear.push(today.subtract(1, 'months').format('MM YYYY'));
    }
    state.last12months = pastYear.reverse();
    console.log('last12months is ', state.last12months);
  }
};

export default {
  state,
  getters,
  mutations
};
