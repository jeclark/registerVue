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
.wrapper {
  display: grid;
  grid-auto-flow: column dense;  /* or 'row dense', 'column', 'column dense' */
  grid-gap: 10px;
  grid-template-areas: "top"
  "list"
  "charts"
  "bottom";
}

.wrapper {
  display: grid;
  grid-auto-flow: column dense;  /* or 'row dense', 'column', 'column dense' */
  grid-gap: 10px;
  grid-template-areas: "top"
  "list"
  "charts"
  "bottom";
  grid-template-columns: 50% 50%;
}

@media (min-width: 500px) {
  .wrapper {
    grid-auto-flow: row dense;
    grid-template-areas: "top top"
       "list charts"
       "bottom bottom";
  }
}

.top {
  grid-area: top;
}

.entryList {
  grid-area: list;
}

.charts {
  grid-area: charts;
}

.bottom {
  grid-area: bottom;
}

body {
  padding: 0;
}
</style>
