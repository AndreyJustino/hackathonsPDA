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
  const email = emailInput.value;
  const endereco = enderecoInput.value;
  e.preventDefault(); //Evita que a página seja atualizada pelo 'submit'

  const tipo = tipoSelect.value;

  if (estaVazio(endereco) || estaVazio(email)) {
    return false;
  }

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
const denunciarButton = document.getElementById("button-denunciar");
denunciarButton.addEventListener("click", cadastrarDenuncia); //Atribuindo o evento ao botao
