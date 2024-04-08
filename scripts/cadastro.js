//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import complaintsDatabase from "./database/database.js";

function onNotAllowingLocation() {
  alert(
    "É necessária a permissão para sabermos de onde voce está nos chamando"
  );
}

function changeAddressValue({ features }) {
  if (features.length == 0)
    return (addressInput.value = "Endereço não encontrado");

  const addres = features[0].properties.formatted;
  addressInput.value = addres;
}

function moveMarker(latlng) {
  marker.setLatLng(latlng);
}

function onSelectAddress({ latlng }) {
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latlng.lat}&lon=${latlng.lng}&apiKey=${GEOAPIFY_API_KEY}`;

  moveMarker();

  fetch(reverseGeocodingUrl)
    .then((result) => result.json())
    .then(changeAddressValue);
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

//a chave da api do geoapify
const GEOAPIFY_API_KEY = "ef172e5aac494f98ad94e03ba0d41fb8";

const DEFAULT_MAP_COORDINATES = [0, 0];
const DEFAULT_MAP_ZOOM = 15;
const MAX_MAP_ZOOM = 20;
const ICON_SIZE = [31, 46];

const MARKER_ICON = L.icon({
  iconUrl: `https://api.geoapify.com/v1/icon/?type=awesome&color=red&size=small&icon=lightbulb&shadowColor=%23512424&scaleFactor=2&apiKey=${GEOAPIFY_API_KEY}`,
  iconSize: ICON_SIZE,
});

const map = L.map("map");
map.setView(DEFAULT_MAP_COORDINATES, DEFAULT_MAP_ZOOM);

let marker;

//Obtendo inputs
const emailInput = document.getElementById("input-email");
const addressInput = document.getElementById("input-address");

//Select
const typeSelect = document.getElementById("select-type");

//Obtendo botao de "submit"
const registrationForm = document.getElementById("form-registration-complaint");
registrationForm.addEventListener("submit", registerComplaint); //Atribuindo o evento ao form

//Obtendo o botao "Ver denuncias"
const goToComplaintsPageButton = document.getElementById(
  "button-goto-complaints"
);
goToComplaintsPageButton.addEventListener("click", goToComplaintsPage);

navigator.geolocation.getCurrentPosition(loadMap, onNotAllowingLocation);

function loadMap({ coords }) {
  const locationCoordinates = new L.LatLng(coords.latitude, coords.longitude);

  marker = new L.marker(locationCoordinates, { icon: MARKER_ICON }).addTo(map);
  map.setView(locationCoordinates, DEFAULT_MAP_ZOOM);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: MAX_MAP_ZOOM,
  }).addTo(map);

  map.on("click", onSelectAddress);
}
