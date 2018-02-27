<template>
  <div class="entryList">
      <div class="total">Total: ${{$store.getters.get_total}} Cleared Total: ${{$store.getters.get_cleared_total}} Outstanding ${{($store.getters.get_cleared_total - $store.getters.get_total).toFixed(2)}}</div>
      <ul>
        <EntryItem
          v-for="item in sorted_entries"
          v-bind:entryitem="item"
          v-bind:key="item.id">
        </EntryItem>
      </ul>
  </div>
</template>

<script>
import EntryItem from '~/components/entrylist/EntryItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    sorted_entries: 'modules/entries/return_sorted_entries',
    get_cleared_total: 'modules/entries/return_cleared_total',
    get_total: 'modules/entries/return_total'
  }),
  components: {
    EntryItem
  },
  methods: {
    ...mapActions({ getAll: 'getAllEntries' })
  },
  created() {
    // console.log('store is ', this.$store);
    this.$store.dispatch('modules/entries/getAllEntries');
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
