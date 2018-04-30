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
import EventBus from '~/components/EventBus.vue'; // needed to update charts
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
      // get the data for the pie chart
      var pieData = [];
      var startData = this.chartEntries;
      var outputData = [];
      var pastMonth = moment()
        .subtract(90, 'days')
        .format('YYYY-MM-DD'); // TODO: Change this to the last 30 days
      // if we have data lets ruduce it down to what we need
      if (startData.length > 0) {
        startData.reduce(function(entries, entry) {
          if (
            entry.tag != null &&
            entry.entrydate >= pastMonth &&
            entry.type === 'debit'
          ) {
            // we only care about debits in the last xx days
            if (pieData[entry.tag] === undefined) {
              // we don't have an existing tag in our array
              // values are store positive and negative, but we want to display +
              pieData[entry.tag] = Math.abs(parseFloat(entry.amount));
            } else {
              // we have an existing tag in our array so add the amount
              pieData[entry.tag] =
                pieData[entry.tag] + Math.abs(parseFloat(entry.amount));
            }
          }
        });
      }
      // Now we have to get the data into a form HighCharts will read
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
      // This is ugly as hell, but necessary to get the data into
      // a form HighCharts will read. First, see if we have data
      if (tempEntries.length > 0) {
        // next for each of our data categories we care about
        this.lineChartCatList.forEach(function(category) {
          // initialize an empty year of data so we don't skip any values
          var catYearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          // filter out any entries for this category
          var catAllData = tempEntries.filter(function(entry) {
            return entry.tag === category;
          });
          // loop through the filtered entries
          catAllData.forEach(function(entry) {
            // convert the date to just mm-YYYY like our last12months values
            var abrDate = entry.entrydate.slice(0, -3);
            // check if we have data for that mm-YYYY combo
            var index = me.last12months.indexOf(abrDate);
            if (index !== -1) {
              // if we do, we add it in to that date's total
              catYearData[index] = catYearData[index] + Math.abs(entry.amount);
            }
          });
          // once we have gone through all the relevent dates for a category
          // we push the data onto our outPut data in a format HighCHarts likes
          outputData.push({
            name: category,
            data: catYearData
          });
        });
      }
      // once we have gone through all of our categories, we can return the data
      console.log('outputData is ', outputData);
      return outputData;
    }
  },
  mounted() {
    // This sets our pie chart data when we first load
    var chart = this.$refs.highcharts.chart;
    chart.series[0].setData(this.pieData);
    // This sets our line chart data when we first load
    var chart2 = this.$refs.highchartsline.chart;
    chart2.update({ xAxis: { categories: this.last12months } });
    // since we have multiple lines, we forEach and addSeries
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
      // TODO: this also needs to get called on edit but not clear
      var chart = this.$refs.highcharts.chart;
      chart.series[0].setData(this.pieData);

      var chart2 = this.$refs.highchartsline.chart;
      console.log('chart2 is ', chart2.series);
      // TODO: This second one is not working might need to call update
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
      chartEntries: this.$store.state.entries,
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
          pointFormat: '<b>$ {point.y:.2f}</b>'
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
