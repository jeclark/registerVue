<template>
  <div class="entryList">
    <div class="total">Total: ${{getTotal}} Cleared Total: ${{getClearedTotal}} Outstanding ${{(getClearedTotal - getTotal).toFixed(2)}}</div>
        <ul>
          <EntryItem
            v-for="item in getEntries"
            v-bind:entryitem="item"
            v-bind:key="item.id"></EntryItem>
        </ul>
      </ul>
  </div>
</template>

<script>
import EntryItem from '~/components/entrylist/EntryItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    getEntries: function() {
      var tempEntries = this.$store.state.modules.entries.entries;
      // this really should be a date sort
      // console.log('return_sorted_entries state is ', state.entries);
      if (tempEntries !== undefined) {
        var sortedEntries = tempEntries.slice(
          Math.max(tempEntries.length - 100, 1)
        );
        // console.log('sorted entries are ', sortedEntries.reverse());
        return sortedEntries.reverse();
      } else {
        return [];
      }
    },
    getTotal: function() {
      // console.log('return_total state is ', state.entries);
      if (
        this.$store.state.modules.entries.entries !== undefined &&
        this.$store.state.modules.entries.entries.length > 0
      ) {
        // console.log('Got entries!');
        var total = parseFloat(
          this.$store.state.modules.entries.entries[0].amount
        );
        this.$store.state.modules.entries.entries.reduce(function(
          entries,
          entry
        ) {
          total = total + parseFloat(entry.amount);
        });
        return total.toFixed(2);
      } else {
        // console.log('No entries! BOOOOOOO!');
        return 0;
      }
    },
    getClearedTotal: function() {
      // console.log('return_cleared_total state is ', state.entries);
      if (
        this.$store.state.modules.entries.entries !== undefined &&
        this.$store.state.modules.entries.entries.length > 0
      ) {
        var total = parseFloat(
          this.$store.state.modules.entries.entries[0].amount
        );
        this.$store.state.modules.entries.entries.reduce(function(
          entries,
          entry
        ) {
          if (entry.cleared === '1') {
            total = total + parseFloat(entry.amount);
          }
        });
        return total.toFixed(2);
      } else {
        return 0;
      }
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
