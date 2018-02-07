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
.entryList {
  padding: 10px;
  ul {
    padding: 0;
  }
}
</style>
