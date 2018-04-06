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
      // console.log('pieData and entries are ', startData);
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
          console.log('category is ', category);
          console.log('typeof category is ', typeof category);
          // initialize an empty year of data
          var catYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          // tempEntries.forEach(function(entry) {
          //   if (entry.tag === category) {
          //     console.log('category is ', category);
          //   }
          // });
          var catAllData = tempEntries.filter(function(entry) {
            return entry.tag === category;
          });
          console.log(catAllData);
        });
      }
    }
  },
  mounted() {
    // console.log('mounted with ', this.chartEntries);
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
