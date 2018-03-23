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
          <input v-model="form.date" class="input" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Tags</label>
        <div class="control">
          <input v-model="form.tags" class="input" type="text">
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
</div>
</template>

<script>
import EventBus from '~/components/EventBus.vue';
export default {
  data() {
    return {
      form: {
        id: '',
        payee: '',
        amount: '',
        date: '',
        tags: '',
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
      // console.log('entry is ', entry);
      // console.log('me is ', me);
      // console.log('form is ', me.form);
      me.form.id = entry.id;
      me.form.payee = entry.payee;
      me.form.amount = entry.amount;
      me.form.date = entry.entrydate;
      me.form.tags = entry.tag;
      me.form.type = entry.type;
      if (entry.cleared === '1') {
        var setCleared = true;
      }
      me.form.cleared = setCleared;
    });
    EventBus.$on('clear', function(entry) {
      console.log('entry is ', entry);
    });
  },
  methods: {
    saveEntry: function(evt) {
      console.log('evt is: ', evt);
      console.log('target is: ', evt.target);
      console.log('id is: ', this.form.id);
      console.log('payee is: ', this.form.payee);
      console.log('amount is: ', this.form.amount);
      console.log('date is: ', this.form.date);
      console.log('tags is: ', this.form.tags);
      console.log('type is: ', this.form.type);
      console.log('cleared is: ', this.form.cleared);
      // grab the values
      // Save or update depending on id value
    },
    setEdit: function(entry) {
      console.log('called setValue with ', entry);
      this.state.form.id = entry.id;
      this.state.form.payee = entry.payee;
      this.state.form.amount = entry.amount;
      this.state.form.date = entry.date;
      this.state.form.tags = entry.tags;
      this.state.form.type = entry.type;
      this.state.form.cleared = entry.cleared;
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
