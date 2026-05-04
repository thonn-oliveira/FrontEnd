// Simulação de um banco de dados (Objeto JSON)
const produtos = {
    "123": {"nome": "Gol do brasil", "preco": 9.99},
    "456": {"nome": "Gol da alemanha", "preco": 9.99}
};

let carrinho = []; // Array que vai guardar todos os itens comprados

// Quando a página carrega, coloca o cursor no campo de código
window.onload = () => {
    document.getElementById("cod").focus();
}

function addProduto() { 
    // 1. Captura os elementos do HTML
    const codinput = document.getElementById("cod");
    const qtdInput = document.getElementById("qtd");

    // 2. Pega os valores digitados
    let valorCod = codinput.value; 
    let valorQtd = parseInt(qtdInput.value) || 1; 

    // 3. Verifica se o produto existe no nosso "banco"
    if(!produtos[valorCod]){
        alert("Produto não encontrado!"); 
        return; // Sai da função se não achar
    }

    // 4. Se achou, cria um objeto 'item' com os dados e o cálculo
    const produtoBase = produtos[valorCod];
    const item = {
        nome: produtoBase.nome,
        preco: produtoBase.preco,
        qtdItem: valorQtd, 
        subTot: produtoBase.preco * valorQtd // Cálculo: $preço \times quantidade$
    };

    // 5. Adiciona o item no array carrinho
    carrinho.push(item);

    // 6. Atualiza a tela e limpa os campos para o próximo item
    atualizaTela();
    codinput.value = "";
    qtdInput.value = 1;
    codinput.focus();
}

function atualizaTela(){
    const lista = document.getElementById("lista");
    const totalSpan = document.getElementById("total");
    lista.innerHTML = ""; // Limpa a lista antes de desenhar de novo

    let totalGeral = 0; 

    // Percorre o carrinho para montar o HTML de cada item
    carrinho.forEach((item) => {
        totalGeral += item.subTot; // Soma o subtotal ao total geral
        
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between"; 
        
        // Coloca o conteúdo dentro do <li>
        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small>${item.qtdItem} x R$ ${item.preco.toFixed(2)}</small>
            </div>
            <strong>R$ ${item.subTot.toFixed(2)}</strong>`;
        
        lista.append(li); // Adiciona o <li> na <ul>
    });

    // Mostra o total final formatado com vírgula
    totalSpan.innerText = totalGeral.toFixed(2).replace(".", ",");
}