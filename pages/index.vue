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
import https from 'https';

console.log('You are Here!');
export default {
  async fetch({ store, params }) {
    console.log('firing fetch');
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    console.log('called getLineData');
    await instance
      .get('https://simple-rest-api.12.ft/api/entry/getTotalsByMonth/')
      .then(resp => {
        console.log('getTotalsByMonth returned ', resp.data);
        store.commit('modules/charts/SET_LAST_TWELVE_MONTHS');
        store.commit('modules/charts/SET_LINE_DATA', resp.data);
      });
    await instance
      .get('https://simple-rest-api.12.ft/api/entry/')
      .then(resp => {
        console.log('entry returned ', resp.data);
        store.commit('modules/entries/SET_ENTRIES', resp.data);
      });
  },
  components: {
    Bottom,
    Charts,
    EntryList,
    Top
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
