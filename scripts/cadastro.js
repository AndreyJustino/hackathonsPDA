//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import complaintsDatabase from "./database/database.js";

/**
 * Função que alerta o usuário de que é necessária permissão para acessar sua localização.
 */
function alertUserOfLocationPermission() {
  alert(
    "É necessária a permissão para sabermos de onde voce está nos chamando"
  );
}

/**
 * Função que tualiza o valor do campo de endereço com base nos dados de localização.
 * @param {Object} data.features - Os dados de localização obtidos do clique no mapa.
 */
function changeAddressValue({ features }) {
  //Caso a api nao ache nenhum local na posição do clique
  if (features.length == 0)
    return (addressInput.value = "Endereço não encontrado"); //Mensagem padrão

  //Pega o endereço formatado na resposta da api
  const addres = features[0].properties.formatted;
  //Muda o campo de endereco para o endereçõ já formatado
  addressInput.value = addres;
}

/**
 * Funcao que move o marcador do mapa para a posição especificada.
 * @param {Object} latlng - Objeto contendo as coordenadas de latitude e longitude.
 */
function moveMarker(latlng) {
  //Move o marcador com base nas coordenadas
  mapMarker.setLatLng(latlng);
}

/**
 * Função do Handler 'onclick' quando o usuario clica no mapa para selecionar endereço.
 * @param {Object} data.latlng - Objeto com as coordenadas de latitude e longitude do endereço selecionado.
 */
function onSelectAddress({ latlng }) {
  //Montando a url da api com base nas coordenadas para obtenção do endereço
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latlng.lat}&lon=${latlng.lng}&apiKey=${GEOAPIFY_API_KEY}`;

  //Movendo o marcador para a posição do clique
  moveMarker(latlng);

  //Fazendo a requisição na url montanda anteriormente
  fetch(reverseGeocodingUrl)
    .then((result) => result.json()) //O resultado vem como uma string, é necessaria a conversao.
    //Quando a conversao acaba é chamada a funcao "changeAddressValue" com os dados da requisiçao como paramentros
    .then(changeAddressValue);
}

/**
 * Função que mostra a tabela ao usuario
 * @description Função que leva o usuário para pagina de denuncias
 * @param {Event} evt //Evento recebido ao clicar no botao, é necessario para o preventDefault
 */
function goToComplaintsPage(evt) {
  evt.preventDefault(); //evita que o form faça as verificacoes dos inputs

  //direciona o usuario para a pagina de tabela
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

//a chave da api do geoapify
const GEOAPIFY_API_KEY = "ef172e5aac494f98ad94e03ba0d41fb8";

const DEFAULT_MAP_COORDINATES = [0, 0]; //coordenadas 0,0. Evita que seja lançado erros de "mapa sem view"
const DEFAULT_MAP_ZOOM = 15; //zoom padrão no inicio da execução
const MAX_MAP_ZOOM = 20; //zoom máximo do mapa. Evita bugs no zoom exagerado dos mapas
const ICON_SIZE = [31, 46]; //Tamanho do icone do marcador

//Layer do mapa
const MAP_LAYER = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: MAX_MAP_ZOOM,
  }
);

//Icone do marcador
const MARKER_ICON = L.icon({
  iconUrl: `https://api.geoapify.com/v1/icon/?type=awesome&color=red&size=small&icon=lightbulb&shadowColor=%23512424&scaleFactor=2&apiKey=${GEOAPIFY_API_KEY}`, //url do icone
  iconSize: ICON_SIZE, //tamanho do icone
});

//Variavel de mapa, o parametro "map" é o id de uma div no html
const map = L.map("map");
map.setView(DEFAULT_MAP_COORDINATES, DEFAULT_MAP_ZOOM); //Setando as cordenadas padroes

//Marcador do mapa
let mapMarker = new L.marker(DEFAULT_MAP_COORDINATES, { icon: MARKER_ICON });

//Obtendo inputs
const emailInput = document.getElementById("input-email");
const addressInput = document.getElementById("input-address");

//Select de tipo
const typeSelect = document.getElementById("select-type");

//Obtendo botao de "submit"
const registrationForm = document.getElementById("form-registration-complaint");
registrationForm.addEventListener("submit", registerComplaint); //Atribuindo o evento ao form

//Obtendo o botao "Ver denuncias"
const goToComplaintsPageButton = document.getElementById(
  "button-goto-complaints"
);
//Registrando o evento de clique no botao "Ver denuncias"
goToComplaintsPageButton.addEventListener("click", goToComplaintsPage);

//Exibe o dialogo de permissão para acessar a localização
//"loadMap" é chamada caso o usuario permita
//"alertUserOfLocationPermission" é chamada caso o usuario nao permita
navigator.geolocation.getCurrentPosition(
  loadMap,
  alertUserOfLocationPermission
);

/**
 * Carrega o mapa com base nas coordenadas de localização fornecidas.
 * @param {Object} data.coords - As coordenadas de latitude e longitude.
 * @param {number} coords.latitude - Latitude da localização.
 * @param {number} coords.longitude - Longitude da localização.
 */
function loadMap({ coords }) {
  //Criar um objeto L.LatLng com as coordenadas de localização
  const locationCoordinates = new L.LatLng(coords.latitude, coords.longitude);

  //Define a visualização do mapa para a localização do usuario
  map.setView(locationCoordinates, DEFAULT_MAP_ZOOM); //Seta o zoom padrao no mapa

  //move o marcador para a localização do usuario
  moveMarker(locationCoordinates);

  //Adicionada a layer do OpenStreetMap ao mapa
  MAP_LAYER.addTo(map);

  //Adicionado o marcador ao mapa
  mapMarker.addTo(map);

  //Adicionar um evento de clique ao mapa para selecionar um endereço
  map.on("click", onSelectAddress);
}
