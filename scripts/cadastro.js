//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import databaseDenuncias from "./database/database.js";

/**
 * Função de evento para cadastro de denúncia
 * @description Função que captura as infos dos inputs e chama "cadastrarDenuncia" do database
 * @param {Event} e Evento de click, é importante para que evitemos o refresh da pagina via submit
 */
function cadastrarDenuncia(e) {
  e.preventDefault(); //Evita que a página seja atualizada pelo 'submit'

  //Objeto que salva as infos dos inputs para salvamento posterior no database
  const denuncia = {
    nome: nomeInput.value,
    email: emailInput.value,
    tipo: tipoInput.value,
  };

  //Chamando o metodo do database para salvamento da denuncia
  databaseDenuncias.cadastrarDenuncia(denuncia);
}

//Obtendo inputs
const nomeInput = document.getElementById("input-nome");
const emailInput = document.getElementById("input-email");
const tipoInput = document.getElementById("input-tipo");

//Obtendo botao de "submit"
const denunciarButton = document.getElementById("button-denunciar");
denunciarButton.addEventListener("click", cadastrarDenuncia); //Atribuindo o evento ao botao
