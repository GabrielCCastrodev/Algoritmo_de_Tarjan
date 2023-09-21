console.clear();//limpa o console.

//vetor onde serão armazenados os objetos criados.
let vetorObjetos = [];
//número identificador crescente para determinar o id do vértice.
let numId = 0;

//identificação do botão de adicionar vértice e também criação do evento de quando clicar no botão e chama a função de criar o objeto que representa o vértice.
const btnAdc = document.getElementById("id_btnAdc");
btnAdc.addEventListener("click", criarObj);

//função que em geral cria o objeto e chama a função para criação dos objetos para qual o vértice aponta.
function criarObj() {
    
    //variável para registrar para quais vértices o vértice atual(numId) irá apontar.
    let valoresAponta;
    //variável que recebe os valores de "valoresAponta" e registra temporariamente quais os vértices serão apontados.
    let valores = []

    // pegar os valores para qual o vértice irá apontar e guardar em valores enquanto o valor for igual a número.
    do {
        //recebe o vértice a ser apontado.
        valoresAponta = prompt(`Informe os valores o vértice ${numId} que vai apontar:`);

        //se o valor for NaN, ele sai da função.
        if (isNaN(valoresAponta)) {
            break;
        }
        //adiciona o valor digitado no array de valores.
        valores.push(parseInt(valoresAponta));

        //chamada da função para criação dos vértices apontados e/ou adicionar no atributo apontadoPor que é apontado pelo vértice de numId atual. 
        apontarPara(valoresAponta)
        
    } while (true);

    //se não existir o objeto na posição a ser criada, irá criar ele (pode ter sido criado anteriormente por ter sido apontado por outr vértice).
    if (!vetorObjetos[numId]) {
        //criação do objeto já diretamente no vetor que registra os objetos.
        vetorObjetos[numId] = {
            id: numId,//número de Id do vértice.
            aponta: [],//atributo que regitra para quais vértices o vértice atual irá apontar.
            apontadoPor: []//Registra quais outros vértices apontam para o vértice atual.
        };
    }
    
    //pegar os valores recebidos e registrar no vértice para quais vértices ele irá apontar.
    valores.forEach((valor, i) => {
        vetorObjetos[numId].aponta.push(valores[i])
    });
    
    //atualiza na tela quais são os vértices criados.
    mostrarVertices()
    console.log(vetorObjetos);
    numId++;//acrescenta o numId para quando for criar o próximo vértice.
}


//função para registrar nos vértices apontados pelo vértice de numId atual que no atributo de apontadoPor ele é apontado. Se ele não existir, ele cria o vértice e já adiciona no atributo.
function apontarPara(valoresAponta) {
    
    //cria o objeto para o qual o vértice criado aponta e atribui o vértice apontando para ele.
    if (!vetorObjetos[valoresAponta]) {
        //criação do vértice apontado e já adiciona no vetor objetos registrando-o.
        vetorObjetos[valoresAponta] = {
            id: parseInt(valoresAponta),//id com o valor de que foi o vértice apontado pelo vértice criado atual.
            aponta: [],//atributo que regitra para quais vértices o vértice atual irá apontar.
            apontadoPor: []//Registra quais outros vértices apontam para o vértice de numId atual.
        };
        //adiciona no vértice que ele é apontado pelo vértice de numId atual.
        vetorObjetos[valoresAponta].apontadoPor.push(numId);
    } else{
        //se o vértice já existir ele só adiciona que ele é apontado pelo vértice atual.
        vetorObjetos[valoresAponta].apontadoPor.push(numId);
    }
    
}

// atalho que chama o a função de criar o vértice ao apertar a tecla "Espaço".
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        criarObj();//função de criar objeto.
    }
});

//criação da variável para determinar a main do HTML.
const main = document.getElementById("id_main");

//função para adicionar os vértices como "bolinhas" na tela dentro da "main".
function mostrarVertices() {

    //limpa a main antes de adicionar os novos vértices, e atualiza os vértices.
    main.innerHTML = ``;
    
    //para cada espaço dentro do vetor de objetos que houver valor, ele irá criar a bola para mostrar o vértice.
    vetorObjetos.forEach((valor, i) => {

        //adiciona a "bolinha" que representa o vértice para ser visível quais vértices foram criados.
        main.innerHTML += `
        <p class="mostrar vertice" data-index="${i}">${vetorObjetos[i].id}</p>
        `;
    })
    
    //variável para criar balão com a informação de cada vértice.
    const mostrar = document.querySelectorAll(".mostrar");

    //para cada vértice irá adicionar as informações no balão de informações do vértice.
    mostrar.forEach((paragrafo, i) => {
        
        //adiciona para mostrar as informações ao passar o mouse por cima da "bolinha" que representa o vértice.
        paragrafo.addEventListener("mouseover", () => {
            
            //adiciona os valores dentro do balão de informações.
            const mostrarInfoVertice = `Id: ${vetorObjetos[mostrar[i].textContent].id}\nAponta para: ${vetorObjetos[mostrar[i].textContent].aponta}\nApontado por: ${vetorObjetos[mostrar[i].textContent].apontadoPor}`;
            paragrafo.setAttribute("data-tooltip", mostrarInfoVertice);

            const mostrarIndex = paragrafo.getAttribute("data-index");
        });
    });
}

//criação da variável para identificar quando o botão de deletar um vértice for criado.
const btnDeletar = document.getElementById("id_btnDeletar");
btnDeletar.addEventListener("click", deletarVertice);

//função que solicita o valor do vértice a ser deletado e deleta ele do vetor de objetos e retira os valores de quem ele aponta e quem aponta para ele.
function deletarVertice() {

    //solicita e guarda qual o valor do vértice a ser deletado.
    let valorDeletar = prompt("Informe o valor do vértice que deseja deletar:")

    //se o valor informado existir ele deleta, se não existir ele informa que o valor informado a ser deletado ele não existe.
    if (vetorObjetos[valorDeletar]) {

        //para cada valor dentro dos atributos de que aponta para ele e que ele aponta ele irá no vetor e retirar esse valor de lá antes de apagar o vértice.
        vetorObjetos[valorDeletar].apontadoPor.forEach((valor, i) => {

            vetorObjetos[vetorObjetos[valorDeletar].apontadoPor[i]].aponta = vetorObjetos[vetorObjetos[valorDeletar].apontadoPor[i]].aponta.filter(item => item != valorDeletar)
        })
        vetorObjetos[valorDeletar].aponta.forEach((valor, i) => {

            vetorObjetos[vetorObjetos[valorDeletar].aponta[i]].apontadoPor = vetorObjetos[vetorObjetos[valorDeletar].aponta[i]].apontadoPor.filter(item => item != valorDeletar)
        })
        
        //deleta no vetor de objetos o vértice informado.
        delete vetorObjetos[valorDeletar];
        //chama a função para mostrar os valores na tela.
        mostrarVertices();
        console.log(vetorObjetos);
    } else {
        //informa que o valor digitado não existe vértice.
        alert("Não existe vértice no valor informado")
    }
}

//criação da variável e criação do evento para quando o botão de executar o algoritmo de tarjan for clicado.
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

// Função que implementa o algoritmo de Tarjan para encontrar grupos fortemente conectados.
function tarjan(grafo) {
    const totalVertices = grafo.length; // Número total de vértices no grafo.
    const visitados = new Array(totalVertices).fill(false); // Vetor para acompanhar se um vértice foi visitado.
    const pilha = []; // Pilha para rastrear vértices visitados.
    const idsDescoberta = new Array(totalVertices).fill(-1); // Vetor para armazenar os ids de descoberta dos vértices.
    const valoresLow = new Array(totalVertices).fill(0); // Vetor para armazenar os valores "low" dos vértices.
    let idAtualDescoberta = 0; // Variável para controlar os ids de descoberta.
    const gruposFortementeConectados = []; // Vetor para armazenar os grupos fortemente conectados.

    // Função recursiva para explorar um vértice e encontrar grupos fortemente conectados.
    function explorarVertice(posicao) {
        idsDescoberta[posicao] = idAtualDescoberta;
        valoresLow[posicao] = idAtualDescoberta;
        idAtualDescoberta++;
        pilha.push(posicao);
        visitados[posicao] = true;

        // Loop para explorar os vizinhos do vértice.
        for (const vizinho of grafo[posicao].aponta) {
            if (idsDescoberta[vizinho] === -1) {
                explorarVertice(vizinho);
            }
            if (visitados[vizinho]) {
                valoresLow[posicao] = Math.min(valoresLow[posicao], valoresLow[vizinho]);
            }
        }

        // Encontrou um grupo fortemente conectado.
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

    // Loop para explorar todos os vértices do grafo.
    for (let i = 0; i < totalVertices; i++) {
        if (grafo[i] && idsDescoberta[i] === -1) { // Verifica se o vértice existe e ainda não foi visitado.
            explorarVertice(i); // Chama a função explorarVertice para encontrar grupos.
        }
    }
    
    return gruposFortementeConectados; // Retorna os grupos fortemente conectados encontrados.
}

//Mostrar e ocultar o tutorial de utilização
const info = document.getElementById("id_info");
info.addEventListener("mouseleave", () => {
    info.style.opacity = "0"
});
info.addEventListener("mouseover", () => {
    info.style.opacity = "1"
});
