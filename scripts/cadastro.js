import databaseDenuncias from "./database/database.js";

function cadastrarDenuncia(e) {
  e.preventDefault();

  const denuncia = {
    nome: nomeInput.value,
    email: emailInput.value,
    tipo: tipoInput.value,
  };

  databaseDenuncias.cadastrarDenuncia(denuncia);
  databaseDenuncias.obterDenuncias();
}

const nomeInput = document.getElementById("input-nome");
const emailInput = document.getElementById("input-email");
const tipoInput = document.getElementById("input-tipo");

const denunciarButton = document.getElementById("button-denunciar");
denunciarButton.addEventListener("click", cadastrarDenuncia);

console.log(denunciarButton);
