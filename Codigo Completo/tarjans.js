console.clear();

let vetorObjetos = [];
let numId = 0;

const btnAdc = document.getElementById("id_btnAdc");
btnAdc.addEventListener("click", criarObj);

function criarObj() {
    
    let valoresAponta;
    let valores = []

    // pegar os valores para qual o vértice ira apontar e guardar em valores
    do {
        valoresAponta = prompt("Informe os valores que vai apontar:");
        if (isNaN(valoresAponta)) {
            break;
        }
        valores.push(parseInt(valoresAponta));
        apontarPara(valoresAponta)
        
    } while (true);

    //se não existir o objeto na posição a ser criada, irá criar ele
    if (!vetorObjetos[numId]) {
        vetorObjetos[numId] = {
            id: numId,
            aponta: [],
            apontadoPor: []
        };
    }

    
    //pegar os valores recebidos e registrar no vértice os valores
    valores.forEach((valor, i) => {
        vetorObjetos[numId].aponta.push(valores[i])
    });
    
    console.log(vetorObjetos);
    numId++;
}

function apontarPara(valoresAponta) {
    
    //cria o objeto para o qual o vértice criado aponta e atribui o vértice apontando pra ele
    if (!vetorObjetos[valoresAponta]) {
        vetorObjetos[valoresAponta] = {
            id: parseInt(valoresAponta),
            aponta: [],
            apontadoPor: []
        };
        vetorObjetos[valoresAponta].apontadoPor.push(numId);
    } else{
        vetorObjetos[valoresAponta].apontadoPor.push(numId);
    }
    
}

const main = document.getElementById("id_main");
const btnMostrar = document.getElementById("id_MostrarVertices");
btnMostrar.addEventListener("click", mostrarVertices);

function mostrarVertices() {

    main.innerHTML = ``;
    
    vetorObjetos.forEach((valor, i) => {

        main.innerHTML += `
        <p class="mostrar vertice" data-index="${i}">${vetorObjetos[i].id}</p>
        `;
    })
    
    const mostrar = document.querySelectorAll(".mostrar");

    mostrar.forEach((paragrafo, i) => {

        console.log(mostrar[i].textContent);
        
        paragrafo.addEventListener("mouseover", () => {
            
            // const mostrarInfoVertice = vetorObjetos[mostrar[i].textContent].aponta;
            const mostrarInfoVertice = `Id: ${vetorObjetos[mostrar[i].textContent].id}\nAponta para: ${vetorObjetos[mostrar[i].textContent].aponta}\nApontado por: ${vetorObjetos[mostrar[i].textContent].apontadoPor}`;
            paragrafo.setAttribute("data-tooltip", mostrarInfoVertice);

            const mostrarIndex = paragrafo.getAttribute("data-index");

        });
    });

}
