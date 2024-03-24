import databaseDenuncias from "./database/database.js";
const body = document.getElementById("body")
let corpoTabela = document.getElementById("corpoTabela")

body.addEventListener("load", main())

function main(){
    
    const denuncias = databaseDenuncias.obterDenuncias() // verificar se é um objeto de objetos

    // const denunciaArray = Object.values(denuncias)

    // exibirTabela(denunciaArray)

}

function exibirTabela(denuncia){
    
    denuncia.forEach((element, index) => {

        const tr = `
        <tr id="element_${index}">
            <td class="id">${element.id}</td>
            <td class="endereco">${element.endereco}</td>
            <td class="tipo">${element.tipo}</td>
        </tr>
        `
        corpoTabela.innerHTML += tr

        // <td class="update"><button class="editar" id="editar" onclick="editar(${index})">Editar</button></td>
        // <td class="delete"><button class="excluir" id="excluir" onclick="excluir(${index})">Excluir</button></td>
    });
}

