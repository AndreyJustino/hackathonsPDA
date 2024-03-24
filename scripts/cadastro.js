//Importanto o database
//Use sempre essa instancia para manter a consistencia de dados
//Padrao singleton
import databaseDenuncias from "./database/database.js";

/**
 * Função de checagem de string vazia
 * @description Função que retorna se o string é vazia
 * @param {string} str string a ser checada
 * @returns {boolean} Boleano que "diz" se a string é vazia ou não
 */
function estaVazio(str) {
  return str == "";
}

/**
 * Função de evento para cadastro de denúncia
 * @description Função que captura as infos dos inputs e chama "cadastrarDenuncia" do database
 * @param {Event} e Evento de click, é importante para que evitemos o refresh da pagina via submit
 */
function cadastrarDenuncia(e) {
  const nome = nomeInput.value;
  const email = emailInput.value;
  const tipo = tipoInput.value;

  if (estaVazio(nome) || estaVazio(email) || estaVazio(tipo)) {
    return false;
  }

  e.preventDefault(); //Evita que a página seja atualizada pelo 'submit'

  //Objeto que salva as infos dos inputs para salvamento posterior no database
  const denuncia = { nome, email, tipo };

  //Chamando o metodo do database para salvamento da denuncia
  databaseDenuncias.cadastrarDenuncia(denuncia);
  console.log(databaseDenuncias.obterDenuncias());
}

//Obtendo inputs
const nomeInput = document.getElementById("input-nome");
const emailInput = document.getElementById("input-email");
const tipoInput = document.getElementById("input-tipo");

//Obtendo botao de "submit"
const denunciarButton = document.getElementById("button-denunciar");
denunciarButton.addEventListener("click", cadastrarDenuncia); //Atribuindo o evento ao botao
