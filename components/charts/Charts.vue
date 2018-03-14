<template>
<div class="charts">
  <highcharts :options="options" ref="highcharts"></highcharts>
  <highcharts :options="options2" ref="highchartsline"></highcharts>
</div>
</template>

<script>
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import { mapGetters, mapActions } from 'vuex';
Vue.use(VueHighcharts);
export default {
  computed: {
    getPie() {
      console.log('called getPie');
      return this.$store.getters['modules/entries/get_pie'];
    },
    getLines() {
      console.log('called getLines');
      return this.$store.getters['modules/charts/get_lines'];
    },
    getMonths() {
      console.log('called getMonths');
      return this.$store.getters['modules/charts/get_last_12_months'];
    }
  },
  data() {
    return {
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
            data: this.$store.getters['modules/entries/get_pie']
          }
        ]
      },
      options2: {
        title: {
          text: 'Monthly Costs',
          x: -20
        },
        xAxis: {
          categories: this.$store.getters['modules/charts/get_last_12_months']
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
        series: this.getLines
      }
    };
  },
  created() {
    console.log('Calling getLineData in created', this.data);
  }
};
</script>

<style>
.charts {
  margin-right: 5px;
}
</style>
