//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import complaintsDatabase from "./database/database.js";

/**
 * Função de clique no mapa
 * @description Função que é chamada ao clicar no mapa, ela move o marcador e tambem muda o "value" do input address
 * @param {Event} e Evento de clique, é de onde são tiradas as infos de clique
 */
function selectMapPosition(e) {
  //Obtendo as posições
  const clickPosX = e.offsetX;
  const clickPosY = e.offsetY;

  //Mudando o marcador de lugar
  mapMarker.style.top = clickPosY + "px";
  mapMarker.style.left = clickPosX + "px";

  //Atualizando o value do input
  addressInput.value = `Localização = X: ${clickPosX} e Y: ${clickPosY}`;
}

/**
 * Função que mostra a tabela ao usuario
 * @description Função que leva o usuário para pagina de denuncias
 * @param {Event} evt //Evento recebido ao clicar no botao, é necessario para o preventDefault
 */
function goToComplaintsPage(evt) {
  evt.preventDefault();
  window.location.href = "./tabela.html";
}

/**
 * Função de evento para cadastro de denúncia
 * @description Função que captura as infos dos inputs e chama "registerComplaint" do database
 */
function registerComplaint() {
  //Obtendo valores dos inputs
  const email = emailInput.value;
  const address = addressInput.value;

  const type = typeSelect.value;

  //Objeto que salva as infos dos inputs para salvamento posterior no database
  const complaint = { email, address, type };

  //Chamando o metodo do database para salvamento da denuncia
  complaintsDatabase.registerComplaint(complaint);
}

//Obtendo inputs
const emailInput = document.getElementById("input-email");
const addressInput = document.getElementById("input-address");

//Select
const typeSelect = document.getElementById("select-type");

//Obtendo botao de "submit"
const registrationForm = document.getElementById("form-registration-complaint");
registrationForm.addEventListener("submit", registerComplaint); //Atribuindo o evento ao form

//Obtendo o botao "Ver denuncias"
const goToComplaintsPageButton = document.getElementById("button-goto-complaints");
goToComplaintsPageButton.addEventListener("click", goToComplaintsPage);

//Obtendo o container do mapa e registrando o evento de clique nele
const mapContainer = document.querySelector(".container-map");
mapContainer.addEventListener("click", selectMapPosition);

//Obtendo o marcador de posição do html
const mapMarker = document.querySelector(".container-map__marker");
