//Importando a instancia do database
import complaintsDatabase from "./database/database.js";

const complaintsTableBody = document.getElementById("complaints-table-body");

//Chama main ao carregar a page
document.body.addEventListener("load", main());

/**
 * Função inicial
 * @description Função que inicia ao carregar a page, carrega os dados do localStorage/database e chama "showTable"
 */
function main() {
  const complaints = complaintsDatabase.getComplaints(); //Recupera as denuncias do databse
  const complaintsArray = Object.values(complaints); //Converte o objeto "denuncias" para um array

  //Inicia a construção da tabela
  showTable(complaintsArray);
}

/**
 * Função que constroi a tabela
 * @description Função que constroi tabela usando o elemento table com base no array extraido do localStorage
 * @param {Array} complaints O array com as denucias que estão salvas e serão exibidas
 */
function showTable(complaints) {
  let table = ""; //Variavel de controle para evitar o uso constante de "innerHTML"

  complaints.forEach(({ email, address, type }, index) => {
    //Estrutura básica do item da tabela
    const denunciaItem = `
        <tr id="element_${index}">
            <td class="email">${email}</td>
            <td class="address">${address}</td>
            <td class="type">${type}</td>
        </tr>`;

    table += denunciaItem;
  });

  //Atribuindo "table" à tabela real do HTML
  complaintsTableBody.innerHTML = table;
}
