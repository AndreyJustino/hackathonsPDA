//Importando a instancia do database
import databaseDenuncias from "./database/database.js";

const corpoTabela = document.getElementById("corpo-tabela");

//Chama main ao carregar a page
document.body.addEventListener("load", main());

/**
 * Função inicial
 * @description Função que inicia ao carregar a page, carrega os dados do localStorage/database e chama "exibirTabela"
 */
function main() {
  const denuncias = databaseDenuncias.obterDenuncias(); //Recupera as denuncias do databse
  const denunciasArray = Object.values(denuncias); //Converte o objeto "denuncias" para um array

  //Inicia a construção da tabela
  exibirTabela(denunciasArray);
}

/**
 * Função que constroi a tabela
 * @description Função que constroi tabela usando o elemento table com base no array extraido do localStorage
 * @param {Array} denuncias O array com as denuncias que estão salvas e serão exibidas
 */
function exibirTabela(denuncias) {
  let tabelaElement = ""; //Variavel de controle para evitar o uso constante de "innerHTML"

  denuncias.forEach(({ email, endereco, tipo }, index) => {
    //Estrutura básica do item da tabela
    const denunciaItem = `
        <tr id="element_${index}">
            <td class="email">${email}</td>
            <td class="endereco">${endereco}</td>
            <td class="tipo">${tipo}</td>
        </tr>`;

    tabelaElement += denunciaItem;
  });

  //Atribuindo "tabelaElement" à tabela real do HTML
  corpoTabela.innerHTML = tabelaElement;
}

