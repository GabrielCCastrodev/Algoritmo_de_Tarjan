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
    
    console.log(valores);

    //se não existir o objeto na posição a ser criada, irá criar ele
    if (!vetorObjetos[numId]) {
        vetorObjetos[numId] = {
            id: numId,
            aponta: [],
            apontadoPor: []
        };
    }

    console.log(vetorObjetos);

    //pegar os valores recebidos e registrar no vértice os valores
    valores.forEach((valor, i) => {
        vetorObjetos[numId].aponta.push(valores[i])
    });
    
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
