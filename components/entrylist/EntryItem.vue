<template>
  <li class="entryItem" :class="entryitem.type">
        <div class="itemOptions">
          <button class="fa fa-pencil itemEdit" aria-hidden="true" v-on:click="editEntry" :value="entryitem.id"></button>
          <button class="fa fa-times itemEdit" aria-hidden="true" v-on:click="deleteEntry" :value="entryitem.id"></button>
          <button class="fa fa-check itemEdit" v-bind:class="{ cleared: parseFloat(entryitem.cleared) }" aria-hidden="true" v-on:click="clearEntry" :value="entryitem.id"></button>
        </div>
        <div class="entryName">{{ entryitem.payee }}</div>
        <div class="entryAmount">${{ Math.abs(entryitem.amount).toFixed(2) }}</div>
        <div class="entryDate">{{ entryitem.entrydate }} </div>
        <div class="entryTags">{{ entryitem.tag }}</div>
      </li>
</template>

<script>
export default {
  props: ['entryitem'],
  methods: {
    editEntry: function(evt) {
      console.log('called editEntry with ', evt.target.value);
      // grab the values
      // populate the fields
    },
    deleteEntry: function(evt) {
      console.log('called deleteEntry with ', evt.target.value);
      // prompt for confirmation
      // delete or cancel based on response
    },
    clearEntry: function(evt) {
      console.log('called clearEntry with ', evt.target.value);
      // toggle the cleared status of the entry
      // and save
    }
  }
};
</script>

<style>
li.entryItem {
  position: relative;
  margin: 5px;
  border-radius: 6px;
  background-color: #eeeeee;
  padding: 8px;
  height: 50px;
  color: black;
  list-style: none;
  &.credit {
    border: 1px solid #409646;
    .entryName {
      color: #409646;
    }
    .entryAmount {
      color: #409646;
    }
  }
  .entryName {
    position: absolute;
    top: 5px;
    left: 5px;
    color: #2f2f2f;
    font-size: 20px;
  }
  .entryAmount {
    position: absolute;
    top: 5px;
    right: 160px;
    color: #2f2f2f;
    font-size: 20px;
    text-align: right;
  }
  .itemOptions {
    position: absolute;
    top: 8px;
    right: 10px;
    button {
      margin: 0 5px;
      border-width: 0;
      border-radius: 50%;
      background-color: #CCCCCC;
      padding: 6px;
      width: 34px;
      height: 34px;
      font-size: 21px;
      &.cleared {
        background-color: #409646;
        color: white;
      }
    }
  }
  .entryDate {
    position: absolute;
    top: 30px;
    left: 5px;
    font-size: 11px;
    font-style: italic;
  }
  .entryTags {
    position: absolute;
    top: 30px;
    right: 160px;
    color: #595959;
    font-size: 13px;
    text-align: right;
  }
}
</style>
