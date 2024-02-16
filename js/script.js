$(document).ready(() => {
  console.log("ready");

  const getAddress = (cep) => {
    $.get("https://viacep.com.br/ws/" + cep + "/json/", (data) => {
      $("#endereço").val(data.logradouro).prop("disabled", true);
      $("#bairro").val(data.bairro).prop("disabled", true);
      $("#municipio").val(data.localidade).prop("disabled", true);
      $("#estado").val(data.uf).prop("disabled", true);
    });
  };

  $("#cep").on("input", function () {
    let cepValue = $(this).val();

    if (cepValue && cepValue.length === 8) {
      let cep = cepValue.replace(/\D/g, "");
      getAddress(cep);
    }
  });

  //------------------------

  $("#btn-add-product").click(() => {
    const newProductCard =
      $(`<form class="d-flex flex-column product-form" id="form-app-2" action="">
  <div class="product-card">
    <div class="trash-icon-div" onclick="deleteForm(this)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="white"
        class="bi bi-trash-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
        />
      </svg>
    </div>
    <div class="card">
      <div class="product-icon-div">
        <div class="product-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="white"
            class="bi bi-box-seam"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"
            />
          </svg>
        </div>
      </div>
      <div class="product-inputs">
        <div class="product-div product">
          <span>Produto</span>
          <input class="product-input" type="text" />
        </div>

        <div class="product-divs-inputs">
          <div class="product-div product">
            <span>UND.Medida</span>
            <input class="product-input" type="number" />
          </div>
          <div class="product-div product">
            <span>QDTDE. em Estoque</span>
            <input class="product-input" type="number" />
          </div>
          <div class="product-div product">
            <span>Valor Unitário</span>
            <input class="product-input" type="number" />
          </div>
          <div class="product-div product">
            <span>Valor Total</span>
            <input class="product-input" disabled type="number" />
          </div>
        </div>
      </div>
    </div>
  </div>
</form>`);

    newProductCard.insertBefore("#btn-add-product");
  });
});

$(".delete-product").click(function () {
  // Encuentra el formulario padre del botón y elimínalo
  $(this).closest("#form-app-2").remove();
});
