//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import complaintsDatabase from "./database/database.js";

function onSelectAddress({ latlng }) {
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latlng.lat}&lon=${latlng.lng}&apiKey=${GEOAPIFY_API_KEY}`;

  fetch(reverseGeocodingUrl)
    .then((result) => result.json())
    .then(changeAddressValue);
}

function changeAddressValue({ features }) {
  if (features.length == 0)
    return (addressInput.value = "Endereço não encontrado");

  const addres = features[0].properties.formatted;
  addressInput.value = addres;
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
var GEOAPIFY_API_KEY = "ef172e5aac494f98ad94e03ba0d41fb8";

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

navigator.geolocation.getCurrentPosition(loadMap, () =>
  alert("É necessária a permissão para usar o recurso de mapa")
);

function loadMap({ coords }) {
  var map = L.map("map").setView([coords.latitude, coords.longitude], 10);

  var mapStyle = L.mapboxGL({
    style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${GEOAPIFY_API_KEY}`,
  });

  const markerIcon = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=cloud&iconType=awesome&scaleFactor=2&apiKey=${GEOAPIFY_API_KEY}`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
  });

  map.on("click", onSelectAddress);

  const zooMarkerPopup = L.popup().setContent("This is Munich Zoo");

  const zooMarker = L.marker([coords.latitude, coords.longitude], {
    icon: markerIcon,
  });
  zooMarker.bindPopup(zooMarkerPopup).addTo(map);

  mapStyle.addTo(map);
}
