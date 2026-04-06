const produtos = {
    "123": {"nome": "Gol do brasil", "preco": 9.99},
    "456": {"nome": "Gol da alemanha", "preco": 9.99},
    "789": {"nome": "Gol da croacia", "preco": 9.99}
}

let carrinho = [];
const audio = new Audio("bip.mp3");

window.onload = () => {
    document.getElementById("cod").focus();
}

function addProduto() { 
    const codinput = document.getElementById("cod");
    const qtdInput = document.getElementById("qtd");

    let valorCod = codinput.value; 
    let valorQtd = parseInt(qtdInput.value) || 1; 

    if(!produtos[valorCod]){
        alert("Produto não encontrado!"); 
        return;
    }

    const produtoBase = produtos[valorCod];

    const item = {
        nome: produtoBase.nome,
        preco: produtoBase.preco,
        qtdItem: valorQtd, 
        subTot: produtoBase.preco * valorQtd
    };

    carrinho.push(item);


    audio.play().catch(e => console.log("Áudio aguardando interação"));

    atualizaTela();


    codinput.value = "";
    qtdInput.value = 1;
    codinput.focus();
}

function atualizaTela(){
    const lista = document.getElementById("lista");
    const totalSpan = document.getElementById("total");
    lista.innerHTML = "";

    let totalGeral = 0; 

    carrinho.forEach((item) => {
        totalGeral += item.subTot;
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center"; 
        li.innerHTML = `
        <div>
            <strong>${item.nome}</strong><br>
            <small>${item.qtdItem} x R$ ${item.preco.toFixed(2)}</small>
        </div>
        <strong>R$ ${item.subTot.toFixed(2)}</strong>`;
        lista.append(li);
    });

    totalSpan.innerText = totalGeral.toFixed(2).replace(".", ",");
}