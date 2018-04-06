<template>
<div class="charts">
  <highcharts :options="this.options" ref="highcharts"></highcharts>
  <highcharts :options="options2" ref="highchartsline"></highcharts>
  <div> {{lineData}} </div>
</div>
</template>

<script>
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import moment from 'moment';
import _ from 'lodash';
// import EventBus from '~/components/EventBus.vue';
Vue.use(VueHighcharts);
export default {
  computed: {
    pieData() {
      // console.trace();
      var pieData = [];
      var startData = this.chartEntries;
      var outputData = [];
      var pastMonth = moment()
        .subtract(90, 'days')
        .format('YYYY-MM-DD');
      console.log('pieData and entries are ', startData);
      if (startData.length > 0) {
        startData.reduce(function(entries, entry) {
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
      // console.log('In pieData and output data is ', outputData);
      return outputData;
    },
    lineData: function() {
      var lineMonthData = [];
      var outputData = [];
      var tempEntries = this.chartEntries;
      var me = this;
      console.log('lineData and tempEntries are ', tempEntries);
      if (tempEntries.length > 0) {
        this.lineChartCatList.forEach(function(category) {
          // console.log('category is ', category);
          var categoryEntries = _.remove(tempEntries, function(entry, index) {
            return entry.tag === category;
          });
          // console.log('categoryEntries is ', categoryEntries);
          // now we have everything in the entries for one category
          if (categoryEntries.length !== 0) {
            me.lineChart12months.forEach(function(monthYear) {
              // console.log('monthYear is ', monthYear);
              // console.log(
              //   'categoryEntries[0].date.slice(0, -3) is ',
              //   categoryEntries[0].entrydate.slice(0, -3)
              // );
              lineMonthData = []; // clean out any old crap
              // is it within the lineChart12months?
              var entriesForMonth = _.remove(categoryEntries, function(
                entry,
                index
              ) {
                // console.log('test');
                return entry.entrydate.slice(0, -3) === monthYear;
              });
              // console.log('entriesForMonth is ', entriesForMonth);
              if (entriesForMonth.length === 0) {
                lineMonthData.push(0);
              } else {
                var total = 0;
                entriesForMonth.forEach(function(mEntry) {
                  total += Math.abs(mEntry.amount);
                });
                lineMonthData.push(total);
              }
              // console.log('lineMonthData is ', lineMonthData);
            });
          }
          // is it in our array of tags we track
          // if so, what month is it for?
          // add the absolute value to the entry for that month
        });
      }
    }
  },
  mounted() {
    var chart = this.$refs.highcharts.chart;
    chart.series[0].setData(this.pieData);
    // EventBus.$on('edit', this.redraw());
    // EventBus.$on('delete', this.redraw());
    // EventBus.$on('add', this.redraw());
  },
  methods: {
    redraw() {
      var chart = this.$refs.highcharts.chart;
      chart.series[0].setData(this.pieData);
    }
  },
  watch: {
    chartEntries: function() {
      this.redraw();
    }
  },
  data() {
    return {
      chartEntries: this.$store.state.modules.entries.entries,
      lineChart12months: this.$store.state.modules.charts.last12months,
      lineChartCatList: this.$store.state.modules.charts.catList,
      options: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Spending by Type in the Past 30 Days'
        },
        tooltip: {
          pointFormat: '<b>$ {point.y:.2f}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f}%',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [
          {
            name: 'Expense',
            colorByPoint: true,
            data: []
          }
        ]
      },
      options2: {
        title: {
          text: 'Monthly Costs',
          x: -20
        },
        xAxis: {
          categories: this.$store.getters['modules/charts/get_months']
        },
        yAxis: {
          title: {
            text: 'Dollars'
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: '#808080'
            }
          ]
        },
        tooltip: {
          valueSuffix: '$'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: this.$store.getters['modules/charts/get_lines']
      }
    };
  }
};
</script>

<style>
.charts {
  margin-right: 5px;
}
</style>
