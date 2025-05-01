document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#post");
  form.addEventListener("submit", function (event) {
    // Obtém os valores das datas de início e fim
    const dataInicio = document.querySelector("input.datainicio").value;
    const dataFim = document.querySelector("input.datafim").value;
    if (dataInicio && dataFim) {
      const timestampInicio = new Date(dataInicio).getTime();
      const timestampFim = new Date(dataFim).getTime();

      if (timestampInicio >= timestampFim) {
        event.preventDefault();

        errormessage("A data de início deve ser menor que a data de fim!");
      }
    }
  });
  document.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".notice-dismiss")) {
      const messageElement = event.target.closest("#message");
      if (messageElement) {
        messageElement.remove();
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".checkbox-btn")) {
      const el = event.target;
      el.classList.toggle("active");
      const targetName = el.dataset.for;
      const checkbox = document.querySelector(
        `input[type="checkbox"][name="${targetName}"]`
      );
      if (checkbox && checkbox.type === "checkbox") {
        checkbox.checked = !checkbox.checked;
      }
    }
  });
  function beautifyCheckboxes() {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"].beautify-checkbox'
    );

    checkboxes.forEach((checkbox) => {
      const name = checkbox.getAttribute("name");

      const btn = document.createElement("div");
      btn.className = "checkbox-btn";
      btn.dataset.for = name;

      if (checkbox.checked) {
        btn.classList.add("active");
      }

      checkbox.insertAdjacentElement("afterend", btn);

      const label = document.querySelector(`label[for="${name}"]`);
      if (label) {
        label.classList.add("beautify-checkbox-label");
      }
    });
  }

  beautifyCheckboxes();
  
  function errormessage(message) {
    const existingMessage = document.querySelector("#message");
    if (existingMessage) {
      existingMessage.remove();
    }
    const newMessage = document.createElement("div");
    newMessage.id = "message";
    newMessage.classList.add("notice", "notice-error", "is-dismissible");
    newMessage.innerHTML =
      `
    <p>` +
      message +
      `</p>
    <button type="button" class="notice-dismiss">
        <span class="screen-reader-text">Dispensar este aviso.</span>
    </button>
    `;
    const hrElement = document.querySelector("hr.wp-header-end");
    if (hrElement) {
      hrElement.parentNode.insertBefore(newMessage, hrElement.nextSibling);
    }
    setTimeout(function () {
      document
        .querySelectorAll("#publishing-action .spinner")
        .forEach(function (spinner) {
          spinner.classList.remove("is-active");
        });

      document
        .querySelectorAll('#major-publishing-actions input[type="submit"]')
        .forEach(function (btn) {
          btn.classList.remove("disabled");
        });
    }, 500);
  }
});
