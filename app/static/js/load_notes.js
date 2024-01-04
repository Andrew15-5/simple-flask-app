// Copyright (C) 2022  Andrew Voynov
(() => {
  const form = document.getElementById("add-note");
  const main = document.getElementsByTagName("main")[0];

  main.insertAdjacentHTML("afterbegin",
    `<div id="loading-table" style="display: flex; align-items: center;">
      <span class="text-success" style="margin-right: 10px;">Loading table</span>
      <div class="spinner-border text-success"></div>
    </div>`);

  const request = new XMLHttpRequest();
  request.onload = event => {
    const new_table = request.response;
    document.getElementById("loading-table")?.remove();
    main.insertAdjacentHTML("afterbegin", new_table);
    form.name.focus();
  }
  request.open("GET", "notes?give");
  request.send();

  form.name.focus();
})();
