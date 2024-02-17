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

  $("#btn-add-product").click(() => {
    const index = $(".product-form").length + 2;

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
            <input id="product-name" class="product-input" type="text" />
          </div>
  
          <div class="product-divs-inputs">
            <div class="product-div product">
              <span>UND.Medida</span>
              <input id="und-medida" class="product-input" type="number" />
            </div>
            <div class="product-div product">
              <span>QDTDE. em Estoque</span>
              <input id="qdtde" class="product-input" type="number" />
            </div>
            <div class="product-div product">
              <span>Valor Unitário</span>
              <input id="valor-unitario" class="product-input" type="number" />
            </div>
            <div class="product-div product">
              <span>Valor Total</span>
              <input id="valor-total" class="product-input" disabled type="number" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>`);

    newProductCard.insertBefore("#btn-add-product");

    const valorUnitarioInput = newProductCard.find("#valor-unitario");
    const cantidadEnStockInput = newProductCard.find("#qdtde");
    const valorTotalInput = newProductCard.find("#valor-total");

    valorUnitarioInput.on("change", updateValorTotal);
    cantidadEnStockInput.on("change", updateValorTotal);

    function updateValorTotal() {
      const valorUnitario = parseFloat(valorUnitarioInput.val()) || 0;
      const cantidadEnStock = parseFloat(cantidadEnStockInput.val()) || 0;

      const valorTotal = valorUnitario * cantidadEnStock;
      valorTotalInput.val(valorTotal.toFixed(2));
    }
  });
});

function handleFileSelect(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var fileBlob = new Blob([e.target.result], { type: input.files[0].type });

      var fileCard = `
        <div class="file-card-div">
          <div class="file-card">
            <div class="trash-icon-div" onclick="deleteFileCard(this)">
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
            <div class="eye-icon" onclick="downloadFile('${input.files[0].name}', '${reader.result}')">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
            />
            <path
              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
            />
          </svg>
            </div>
            <span class="file-span">${input.files[0].name}</span>
          </div>
        </div>
      `;

      $(fileCard).insertBefore("#add-anexo");
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function downloadFile(fileName, fileData) {
  var link = document.createElement("a");
  link.href = fileData;
  link.download = fileName;
  link.click();
}

function deleteFileCard(element) {
  $(element).closest(".file-card-div").remove();
}
$(".delete-product").click(function () {
  $(this).closest("#form-app-2").remove();
});

function getData() {
  const camposObligatorios = [
    "#razao-social",
    "#nome-fantasia",
    "#cnpj",
    "#inscriçao-estadual",
    "#inscriçao-municipal",
    "#nome-pessoa",
    "#telefone",
    "#email",
  ];

  for (const campo of camposObligatorios) {
    if ($(campo).val() === "") {
      alert("Por favor, complete todos os campos obrigatorios.");
      return;
    }
  }

  const productos = $(".product-form")
    .map(function (index) {
      const producto = {
        indice: index + 1,
        descripcionProduto: $(this).find("#product-name").val(),
        unidadeMedida: $(this).find("#und-medida").val(),
        qtdeEstoque: $(this).find("#qdtde").val(),
        valorUnitario: $(this).find("#valor-unitario").val(),
        valorTotal: $(this).find("#valor-total").val(),
      };

      return producto;
    })
    .get();

  if (productos.length === 0) {
    alert("Debe agregar al menos un producto.");
    return;
  }

  const anexos = $(".file-card-div")
    .map(function (index) {
      const fileSpan = $(this).find(".file-span");
      const anexo = {
        indice: index + 1,
        nomeArquivo: fileSpan.text(),
        blobArquivo: getBlob(fileSpan),
      };

      return anexo;
    })
    .get();

  if (anexos.length === 0) {
    alert("Debe agregar al menos un anexo.");
    return;
  }

  const datosFornecedor = {
    razaoSocial: $("#razao-social").val(),
    nomeFantasia: $("#nome-fantasia").val(),
    cnpj: $("#cnpj").val(),
    inscricaoEstadual: $("#inscriçao-estadual").val(),
    inscricaoMunicipal: $("#inscriçao-municipal").val(),
    nomeContato: $("#nome-pessoa").val(),
    telefoneContato: $("#telefone").val(),
    emailContato: $("#email").val(),
    produtos: productos,
    anexos: anexos,
  };

  console.log(datosFornecedor);
}

function getBlob(fileSpan) {
  return fileSpan.data("blob") || "iouahsiuahusihausihiahiuah";
}

$("#btn-send").on("click", sendData);

$("#loadingModal").on("shown.bs.modal", function () {
  $(this).find(".modal-dialog").css({
    transform: "translate(0, -50%)",
    "-ms-transform": "translate(0, -50%)",
    "-webkit-transform": "translate(0, -50%)",
    "-o-transform": "translate(0, -50%)",
  });
});

function sendData() {
  $("#loadingModal").modal("show");

  setTimeout(function () {
    $("#loadingModal").modal("hide");

    getData();
  }, 5000);
}
