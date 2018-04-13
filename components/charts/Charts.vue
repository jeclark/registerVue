<template>
<div class="charts">
  <highcharts :options="this.options" ref="highcharts"></highcharts>
  <highcharts :options="this.options2" ref="highchartsline"></highcharts>
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
    last12months() {
      // this is the set of columns for our line chart
      // it also helps us loop through the entry data list
      var today = moment().startOf('month');
      var pastYear = [today.format('YYYY-MM')];
      for (var i = 1; i <= 11; i++) {
        pastYear.push(today.subtract(1, 'months').format('YYYY-MM'));
      }
      // this gets us the list in ascending order
      return pastYear.reverse();
    },
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
      // console.log('lineData and tempEntries are ', tempEntries);
      if (tempEntries.length > 0) {
        this.lineChartCatList.forEach(function(category) {
          // console.log('category is ', category);
          // console.log('typeof category is ', typeof category);
          // initialize an empty year of data
          var catYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var catAllData = tempEntries.filter(function(entry) {
            return entry.tag === category;
          });
          // console.log(catAllData);
          catAllData.forEach(function(entry) {
            var abrDate = entry.entrydate.slice(0, -3);
            // console.log('date is ', abrDate);
            var index = me.last12months.indexOf(abrDate);
            if (index !== -1) {
              catYearData[index] = catYearData[index] + Math.abs(entry.amount);
            }
          });
          // console.log('catYearData is ', catYearData);
          outputData.push({
            name: category,
            data: catYearData
          });
        });
      }
      console.log('outputData is ', outputData);
      return outputData;
    }
  },
  mounted() {
    // console.log('mounted with ', this.chartEntries);
    var chart = this.$refs.highcharts.chart;
    chart.series[0].setData(this.pieData);
    console.log('last12months is ', this.last12months);

    var chart2 = this.$refs.highchartsline.chart;
    console.log('chart2 is ', chart2.series);
    chart2.update({ xAxis: { categories: this.last12months } });
    this.lineData.forEach(function(series) {
      if (series.length !== 0) {
        console.log('series.length is ', series, series.name);
        chart2.addSeries(
          { id: series.name, name: series.name, data: series.data },
          true,
          true
        );
      }
    });
  },
  methods: {
    redraw() {
      var chart = this.$refs.highcharts.chart;
      chart.series[0].setData(this.pieData);

      var chart2 = this.$refs.highchartsline.chart;
      console.log('chart2 is ', chart2.series);

      chart2.series[0].setData(this.lineData);
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
      lineChartCatList: [
        // this is a list of tags we care about
        'groceries',
        'utilities',
        'entertainment',
        'gas',
        'woodworking',
        'restaurant'
      ],
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
          categories: this.last12months
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
        }
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
