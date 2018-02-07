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

console.log('You are Here!');
export default {
  components: {
    Bottom,
    Charts,
    EntryList,
    Top
  }
};
</script>

<style>
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
