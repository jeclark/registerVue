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

export default {
  async fetch({ store, params }) {
    // initial load of all entry data
    console.log('firing fetch with ', store, params);
    // store.commit('DO_STUFF');
    // this is for local use since everything forces https now and
    // the local certificate is self signed
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    // grab the local data from anAPI
    return instance
      .get('https://simple-rest-api.12.ft/api/entry/')
      .then(resp => {
        console.log('fetch entry returned ', resp.data);
        // set the state for entries
        store.commit('SET_ENTRIES', resp.data);
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
