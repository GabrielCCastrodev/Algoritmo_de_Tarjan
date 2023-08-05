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
    
    mostrarVertices()
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

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        criarObj();
    }
});

const main = document.getElementById("id_main");

function mostrarVertices() {

    main.innerHTML = ``;
    
    vetorObjetos.forEach((valor, i) => {

        main.innerHTML += `
        <p class="mostrar vertice" data-index="${i}">${vetorObjetos[i].id}</p>
        `;
    })
    
    const mostrar = document.querySelectorAll(".mostrar");

    mostrar.forEach((paragrafo, i) => {
        
        paragrafo.addEventListener("mouseover", () => {
            
            const mostrarInfoVertice = `Id: ${vetorObjetos[mostrar[i].textContent].id}\nAponta para: ${vetorObjetos[mostrar[i].textContent].aponta}\nApontado por: ${vetorObjetos[mostrar[i].textContent].apontadoPor}`;
            paragrafo.setAttribute("data-tooltip", mostrarInfoVertice);

            const mostrarIndex = paragrafo.getAttribute("data-index");

        });
    });

}

const btnDeletar = document.getElementById("id_btnDeletar");
btnDeletar.addEventListener("click", deletarVertice);

//função para deletar um vértice
function deletarVertice() {

    let valorDeletar = prompt("Informe o valor do vértice que deseja deletar:")

    if (vetorObjetos[valorDeletar]) {

        vetorObjetos[valorDeletar].apontadoPor.forEach((valor, i) => {

            vetorObjetos[vetorObjetos[valorDeletar].apontadoPor[i]].aponta = vetorObjetos[vetorObjetos[valorDeletar].apontadoPor[i]].aponta.filter(item => item != valorDeletar)
        })
        
        delete vetorObjetos[valorDeletar]
        mostrarVertices();
        console.log(vetorObjetos);
    } else {
        alert("Não existe vértice no valor informado")
    }
}

const btnTarjan = document.getElementById("id_btnTarjan");
btnTarjan.addEventListener("click", algoritmo_de_Tarjan);

function algoritmo_de_Tarjan() {
    const grupos = tarjan(vetorObjetos);
    console.log("Grupos do Grafo:");
    main.innerHTML = "";
    grupos.forEach((grupo, index) => {
        const paragrafos = grupo.map(valor => `<p class="mostrar vertice">${valor}</p>`).join("");
        
        main.innerHTML += `
        <div class="mostrar_grupos">
        <header class="headerDiv">
            <p>Grupo ${index + 1}</p>
        </header>
        ${paragrafos}
        </div>`;

        console.log(`Grupo ${index + 1}:`, grupo);
    });
}

// Função para executar o algoritmo de Tarjan em um grafo
function tarjan(grafo) {
    const totalVertices = grafo.length; // Número total de vértices no grafo
    const visitados = new Array(totalVertices).fill(false); // Vetor para acompanhar se um vértice foi visitado
    const pilha = []; // Pilha para rastrear vértices visitados
    const idsDescoberta = new Array(totalVertices).fill(-1); // Vetor para armazenar os ids de descoberta dos vértices
    const valoresLow = new Array(totalVertices).fill(0); // Vetor para armazenar os valores "low" dos vértices
    let idAtualDescoberta = 0; // Variável para controlar os ids de descoberta
    const gruposFortementeConectados = []; // Vetor para armazenar os grupos fortemente conectados

    function explorarVertice(posicao) {
        idsDescoberta[posicao] = idAtualDescoberta;
        valoresLow[posicao] = idAtualDescoberta;
        idAtualDescoberta++;
        pilha.push(posicao);
        visitados[posicao] = true;

        for (const vizinho of grafo[posicao].aponta) {
            if (idsDescoberta[vizinho] === -1) {
                explorarVertice(vizinho);
            }
            if (visitados[vizinho]) {
                valoresLow[posicao] = Math.min(valoresLow[posicao], valoresLow[vizinho]);
            }
        }

        if (idsDescoberta[posicao] === valoresLow[posicao]) {
            const grupo = [];
            let aux;
            do {
                aux = pilha.pop();
                visitados[aux] = false;
                grupo.push(aux);
            } while (posicao !== aux);
            gruposFortementeConectados.push(grupo);
        }
    }

    for (let i = 0; i < totalVertices; i++) {
        if (grafo[i] && idsDescoberta[i] === -1) { // Verifica se o vértice existe e ainda não foi visitado
            explorarVertice(i);
        }
    }
    
    return gruposFortementeConectados;// Retorna os grupos fortemente conectados encontrados
}
