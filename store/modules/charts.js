import axios from 'axios';
import moment from 'moment';
import https from 'https';
import lodash from 'lodash';

export const state = () => ({
  lineData: [],
  last12months: [],
  catList: [
    'groceries',
    'utilities',
    'entertainment',
    'gas',
    'woodworking',
    'restaurant'
  ]
});
// getters
const getters = {
  get_lines(state, getters) {
    // console.log('called get_lines with months', state.last12months);
    // console.log('called get_lines with state', state.lineData);
    var outputArray = [];
    var tempData = [];
    // loop through catList
    state.catList.forEach(function(category) {
      tempData[category] = [];
      // console.log('tempData is ', tempData);
      // loop through the last 12 months
      state.last12months.forEach(function(eachMonth) {
        var data = lodash.find(state.lineData, function(obj) {
          return obj.yearMonth === eachMonth && obj.tag === category;
        });
        // if we have a value for the month, we set it, otherwise it is set to 0
        if (typeof data !== 'undefined') {
          tempData[category].push(Math.abs(data.total));
        } else {
          tempData[category].push(0);
        }
      });
      // console.log('for category this is tempData', category, tempData);
    });
    // at the end of the loop we add things to our outputArray
    for (var key in tempData) {
      outputArray.push({
        name: key,
        data: tempData[key]
      });
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
      pastYear.push(today.subtract(1, 'months').format('YYYY-MM'));
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
