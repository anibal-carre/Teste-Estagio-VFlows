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
});
