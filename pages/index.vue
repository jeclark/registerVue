<template>
  <div class="entryList">
      <ul>
        <EntryItem />
      </ul>
  </div>
</template>

<script>
import EntryItem from '~/components/entrylist/EntryItem.vue';

export default {
  components: {
    EntryItem
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
