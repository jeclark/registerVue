<template>
  <li className={"entryItem "}>
        <div className="itemOptions">
          <button
            className="fa fa-pencil itemEdit"
            aria-hidden="true"></button>
          <button
            className="fa fa-times itemEdit"
            aria-hidden="true"></button>
          <button
            className={"fa fa-check itemEdit"}
            aria-hidden="true"></button>
        </div>
        <div className="entryName">Payee</div>
        <div className="entryAmount">$Amount</div>
        <div className="entryDate">Date </div>
        <div className="entryTags">tags</div>
      </li>
</template>

<script>
// Nothing to see here.
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
