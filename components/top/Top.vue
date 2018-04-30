<template>
<div class="top">
  <form v-on:submit.prevent="saveEntry">
    <section class="form">
      <div class="field">
        <label class="label">Payee</label>
        <div class="control">
          <input v-model="form.payee" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Amount</label>
        <div class="control">
          <input v-model="form.amount" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input v-model="form.entrydate" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Tags</label>
        <div class="control">
          <input v-model="form.tag" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="radio">
              <input v-model="form.type" type="radio" value="credit">
              Credit
            </label>
          <label class="radio">
              <input v-model="form.type" type="radio" value="debit">
              Debit
            </label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="checkbox">
              <input type="checkbox" v-model="form.cleared">
              Cleared?
            </label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="hidden" v-model="form.id">
          <button class="itemSave" aria-hidden="true">Submit</button>
        </div>
      </div>
    </section>
  </form>
  <button class="itemSave" aria-hidden="true" v-on:click="clearForm">Clear Form</button>
</div>
</template>

<script>
import EventBus from '~/components/EventBus.vue';
import axios from 'axios';
import https from 'https';
export default {
  data() {
    return {
      form: {
        id: '',
        payee: '',
        amount: '',
        entrydate: '',
        tag: '',
        type: 'debit',
        cleared: false
      }
    };
  },
  mounted() {
    // console.log('EventBus is ', EventBus);
    var me = this;
    var setCleared = false;
    EventBus.$on('edit', function(entry) {
      // start listening for edit events and run the function
      // we got an edit event and an entry item from the event bus
      // set the state which updates the form fields
      console.log('entry is ', entry);
      me.form.id = entry.id;
      me.form.payee = entry.payee;
      me.form.amount = Math.abs(entry.amount);
      me.form.entrydate = entry.entrydate;
      me.form.tag = entry.tag;
      me.form.type = entry.type;
      if (entry.cleared == 1) {
        var setCleared = true;
      }
      console.log('setCleared is ', setCleared);
      me.form.cleared = setCleared;
    });
  },
  methods: {
    saveEntry: function(evt) {
      var cleared = 0;
      var method = '';
      var me = this;
      const instance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      });
      // console.log('id is: ', this.form.id);
      if (me.form.id !== '') {
        method = 'put';
      } else {
        method = 'post';
      }
      if (me.form.cleared === true) {
        cleared = 1;
      }
      console.log('saveEntry and me.form.cleared is ', me.form.cleared);
      console.log('saveEntry and cleared is ', cleared);
      var formData = {
        id: me.form.id,
        payee: me.form.payee,
        amount: me.form.amount,
        entrydate: me.form.entrydate,
        tag: me.form.tag,
        type: me.form.type,
        cleared: cleared
      };

      instance({
        method: method,
        url: 'https://simple-rest-api.12.ft/api/entry',
        data: formData
      })
        .then(function(response) {
          // it worked!
          if (me.form.id !== '') {
            console.log('This is an edit of id: ', me.form.id);
            me.$store.commit('UPDATE_ENTRY', formData);
          } else {
            console.log('This is a new entry');
            console.log('response is ', response.data.data[0]);
            formData.id = response.data.data[0].id;
            me.$store.commit('INSERT_ENTRY', formData);
          }
          // clear the form values
          me.clearForm();
          // TODO: Update graphs with new data
        })
        .catch(function(response) {
          // stuff broke - handle error
          console.log(response);
        });
    },
    setEdit: function(entry) {
      console.log('called setValue with ', entry);
      var entryCleared = false;
      if (entry.cleared == 1) {
        entryCleared = true;
      }
      this.state.form.id = entry.id;
      this.state.form.payee = entry.payee;
      this.state.form.amount = entry.amount;
      this.state.form.date = entry.entrydate;
      this.state.form.tag = entry.tag;
      this.state.form.type = entry.type;
      this.state.form.cleared = entryCleared;
    },
    clearForm: function() {
      // console.log('state is ', this.state);
      this.form.id = '';
      this.form.payee = '';
      this.form.amount = '';
      this.form.entrydate = '';
      this.form.tag = '';
      this.form.type = 'debit';
      this.form.cleared = false;
    }
  }
};
</script>

<style>
.top {
  border-bottom: 1px solid black;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  .field {
    text-align: left;
    display: inline-block;
    margin: 0px 5px;
    label {
      font-size: 14px;
    }
    .control {
      margin-top: 0;
      padding: 0;
      font-size: 14px;
      .itemSave {
        padding: 5px 10px;
        font-size: 16px;
        margin-left: 20px;
        border-radius: 5px;
        background-color: #d1d1d1;
        border: 1px solid #505050;
        .fa-save:before, .fa-floppy-o:before {
          margin-right: 10px;
        }
      }
      .itemClear {
        padding: 5px 10px;
        font-size: 16px;
        margin-left: 20px;
        border-radius: 5px;
        background-color: #d1d1d1;
        border: 1px solid #505050;
        .fa-save:before, .fa-floppy-o:before {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
