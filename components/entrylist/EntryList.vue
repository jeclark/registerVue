<template>
  <div class="entryList">
      <ul>
        <EntryItem />
        test
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
