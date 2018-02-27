<template>
<div class="charts">
  <highcharts :options="options" ref="highcharts"></highcharts>
</div>
</template>

<script>
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import { mapGetters, mapActions } from 'vuex';
Vue.use(VueHighcharts);
export default {
  computed: mapGetters({
    pie: 'get_pie',
    lines: 'get_lines'
  }),
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
            data: this.$store.getters.get_pie
          }
        ]
      }
    };
  },
  created() {
    // console.log('store is ', this.$store);
    this.$store.dispatch('modules/charts/getLineData');
  }
};
</script>

<style>
.charts {
  margin-right: 5px;
}
</style>
