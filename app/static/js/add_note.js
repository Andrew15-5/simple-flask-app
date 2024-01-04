// Copyright (C) 2022  Andrew Voynov
(() => {
  const form = document.getElementById("add-note");
  form.onsubmit = async event => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.onloadstart = event => {
      form.name.value = "";
      form.content.value = "";
    }
    request.onload = event => {
      const new_table = request.response;
      const old_table = document.getElementById("notes");
      document.getElementById("download-notes")?.parentElement.remove();
      old_table.insertAdjacentHTML("beforebegin", new_table);
      old_table.remove();
      form.name.focus();
    }
    request.open("POST", "notes");
    request.send(new FormData(form));
  };
  form.name.focus();
})();
