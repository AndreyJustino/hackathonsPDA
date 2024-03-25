//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import databaseDenuncias from "./database/database.js";

/**
 * Função de clique no mapa
 * @description Função que é chamada ao clicar no mapa, ela move o marcador e tambem muda o "value" do input endereco
 * @param {Event} e Evento de clique, é de onde são tiradas as infos de clique
 */
function selecionarPosicaoNoMapa(e) {
  //Obtendo as posições
  const cliquePosX = e.offsetX;
  const cliquePosY = e.offsetY;

  //Mudando o marcador de lugar
  mapaMarcador.style.top = cliquePosY + "px";
  mapaMarcador.style.left = cliquePosX + "px";

  //Atualizando o value do input
  enderecoInput.value = `Localização = X: ${cliquePosX} e Y: ${cliquePosY}`;
}

/**
 * Função que mostra a tabela ao usuario
 * @description Função que leva o usuário para pagina de denuncias
 * @param {Event} evt //Evento recebido ao clicar no botao, é necessario para o preventDefault
 */
function irParaPaginaDeDenuncias(evt) {
  evt.preventDefault();
  window.location.href = "./tabela.html";
}

/**
 * Função de evento para cadastro de denúncia
 * @description Função que captura as infos dos inputs e chama "cadastrarDenuncia" do database
 */
function cadastrarDenuncia() {
  //Obtendo valores dos inputs
  const email = emailInput.value;
  const endereco = enderecoInput.value;

  const tipo = tipoSelect.value;

  //Objeto que salva as infos dos inputs para salvamento posterior no database
  const denuncia = { email, endereco, tipo };

  //Chamando o metodo do database para salvamento da denuncia
  databaseDenuncias.cadastrarDenuncia(denuncia);
  // console.log(Object.values(databaseDenuncias.obterDenuncias()));
}

//Obtendo inputs
const emailInput = document.getElementById("input-email");
const enderecoInput = document.getElementById("input-endereco");

//Select
const tipoSelect = document.getElementById("select-tipo");

//Obtendo botao de "submit"
const formCadastro = document.getElementById("form-cadastro-denuncias");
formCadastro.addEventListener("submit", cadastrarDenuncia); //Atribuindo o evento ao form

//Obtendo o botao "Ver denuncias"
const verDenunciasButton = document.getElementById("button-tabela");
verDenunciasButton.addEventListener("click", irParaPaginaDeDenuncias);

//Obtendo o container do mapa e registrando o evento de clique nele
const mapaContainer = document.querySelector(".container-mapa");
mapaContainer.addEventListener("click", selecionarPosicaoNoMapa);

//Obtendo o marcador de posição do html
const mapaMarcador = document.querySelector(".container-mapa__marcador");
