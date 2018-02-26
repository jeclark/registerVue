<template>
  <div class="wrapper">
    <Top/>
    <EntryList/>
    <Charts/>
    <Bottom/>
  </div>
</template>

<script>
import Bottom from '~/components/bottom/Bottom.vue';
import Charts from '~/components/charts/Charts.vue';
import EntryList from '~/components/entrylist/EntryList.vue';
import Top from '~/components/top/Top.vue';
import axios from 'axios';

console.log('You are Here!');
export default {
  async fetch({ store, params }) {
    return axios
      .get('http://simple-rest-api.dev/api/entry/')
      .then(data => {
        store.commit('SET_ENTRIES', data.data);
        return axios.get(
          'http://simple-rest-api.dev/api/entry/getTotalsByMonth'
        ); // using response.data
      })
      .then(data => {
        store.commit('SET_LINE_DATA', data.data);
        console.log('Response', data);
      });
  },
  components: {
    Bottom,
    Charts,
    EntryList,
    Top
  },
  methods: {
    fetchEntries: function() {
      console.log('Called fetchEntries');
    },
    fetchTotals: function() {
      console.log('Called fetchTotals');
    },
    fetchCharts: function() {
      console.log('Called fetchEntries');
    }
  }
};
</script>

<style>
@import '../assets/font-awesome/css/font-awesome.css';

.wrapper {
  display: grid;
  grid-auto-flow: column dense;  /* or 'row dense', 'column', 'column dense' */
  grid-gap: 10px;
  grid-template-areas: "top"
  "list"
  "charts"
  "bottom";
}

.wrapper {
  display: grid;
  grid-auto-flow: column dense;  /* or 'row dense', 'column', 'column dense' */
  grid-gap: 10px;
  grid-template-areas: "top"
  "list"
  "charts"
  "bottom";
  grid-template-columns: 50% 50%;
}

@media (min-width: 500px) {
  .wrapper {
    grid-auto-flow: row dense;
    grid-template-areas: "top top"
       "list charts"
       "bottom bottom";
  }
}

.top {
  grid-area: top;
}

.entryList {
  grid-area: list;
}

.charts {
  grid-area: charts;
}

.bottom {
  grid-area: bottom;
}

body {
  padding: 0;
}
</style>
