<template>
  <div class="entryList">
      <ul>
        <EntryItem
          v-for="item in entryitems"
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
  },
  data() {
    return {
      entryitems: [
        {
          id: 1,
          payee: 'Foo',
          amount: '1.00',
          date: '10/15/2017',
          tags: 'tag 1'
        },
        {
          id: 2,
          payee: 'Bar',
          amount: '2.50',
          date: '10/29/2017',
          tags: 'tag 2'
        },
        {
          id: 3,
          payee: 'Baz',
          amount: '4.30',
          date: '11/02/2017',
          tags: 'tag 3.5'
        }
      ]
    };
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
