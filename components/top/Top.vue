<template>
<div class="top">
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
        <button class="itemSave" aria-hidden="true" v-on:click="saveEntry">Save</button>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        payee: '',
        amount: '',
        date: '',
        tags: '',
        type: 'debit',
        cleared: false
      }
    };
  },
  methods: {
    saveEntry: function(evt) {
      console.log('called saveEntry with ', evt);
      // grab the values
      // Save or update depending on id value
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
    }
  }
}
</style>
