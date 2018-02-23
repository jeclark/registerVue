<template>
  <div class="entryList">
      <div class="total">Total: ${{$store.getters.get_total}} Cleared Total: ${{$store.getters.get_cleared_total}} Outstanding ${{($store.getters.get_cleared_total - $store.getters.get_total).toFixed(2)}}</div>
      <ul>
        <EntryItem
          v-for="item in $store.getters.sorted_entries"
          v-bind:entryitem="item"
          v-bind:key="item.id">
        </EntryItem>
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
.entryList {
  padding: 10px;
  ul {
    padding: 0;
  }
}
</style>
