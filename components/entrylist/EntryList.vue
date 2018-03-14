<template>
  <div class="entryList">
    <div class="total">Total: ${{getTotal}} Cleared Total: ${{getClearedTotal}} Outstanding ${{(getClearedTotal - getTotal).toFixed(2)}}</div>
      <ul>
        <EntryItem
          v-for="item in getEntries"
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
  computed: {
    getEntries() {
      return this.$store.getters['modules/entries/return_sorted_entries'];
    },
    getClearedTotal() {
      return this.$store.getters['modules/entries/return_cleared_total'];
    },
    getTotal() {
      return this.$store.getters['modules/entries/return_total'];
    }
  },
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
