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
import lodash from 'lodash';
import EventBus from '~/components/EventBus.vue';
import axios from 'axios';
import https from 'https';
export default {
  props: ['entryitem'],
  methods: {
    editEntry: function(evt) {
      EventBus.$emit('edit', this.entryitem); // this gets caught by Top.vue
      console.log('called editEntry with ', evt.target.value);
      console.log('entryItem is ', this.entryitem);
    },
    deleteEntry: function(evt) {
      var me = this;
      console.log('firing deleteEntry with ', me.entryitem);
      // warn user
      var result = confirm(
        'Do you want to delete this entry for ' + me.entryitem.payee + '?'
      );
      if (result === true) {
        console.log('Result and entry', result, me.entryitem);
        const instance = axios.create({
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        });
        // send delete to the server
        var formData = {
          id: me.entryitem.id
        };

        instance({
          method: 'delete',
          url: 'https://simple-rest-api.12.ft/api/entry',
          data: formData
        })
          .then(function(response) {
            // it worked!
            me.$store.commit('DELETE_ENTRY', formData);
            // TODO: Update graphs with new data
          })
          .catch(function(response) {
            // stuff broke - handle error
            console.log(response);
          });
        // on success, send the event
        EventBus.$emit('delete', this.entryitem);
      } // else we do nothing
    },
    clearEntry: function(evt) {
      console.log('evt is ', evt);
      evt.target.blur();
      console.log('firing a clear event with ', this.entryitem);
      console.log('store is ', this.$store);
      var me = this;
      var clearedTemp = 1;
      console.log('Before ', me.entryitem.cleared);
      if (me.entryitem.cleared == 1) {
        clearedTemp = 0;
      }
      console.log('After ', clearedTemp);
      const instance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      });
      // send clear (update) to the server
      console.log('id is ', me.entryitem.id);
      var formData = {
        id: me.entryitem.id,
        payee: me.entryitem.payee,
        amount: me.entryitem.amount, // this should know when it's negative or positive
        entrydate: me.entryitem.entrydate,
        tag: me.entryitem.tag,
        type: me.entryitem.type,
        cleared: clearedTemp
      };

      instance({
        method: 'put',
        url: 'https://simple-rest-api.12.ft/api/entry',
        data: formData
      })
        .then(function(response) {
          // it worked!
          me.$store.commit('UPDATE_ENTRY', formData);
          // TODO: Update graphs with new data
        })
        .catch(function(response) {
          // stuff broke - handle error
          console.log(response);
        });
      // on success, send the event
      EventBus.$emit('save', this.entryitem);
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
      &:focus {
        outline-style: none;
        background-color: #409646;
        color: yellow;
      }
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
