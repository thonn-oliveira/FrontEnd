const bicho = document.getElementById("bicho");
const btn = document.getElementById("btn-alimentar"); // ✅ id correto

const estados = {
    normal: "bichinho.png",
    clicado: "bichinho_comendo.png",
    alimentado: "bichinho_feliz.png",
    fome30: "bichinho_bravo.png",
    fome60: "bichinho_morto.png",
}

let contador = 0;
let intervalo = null;
let time_Click = null;
let time_Out = null;


function init_cont() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        contador++;
        console.log("Tempo:", contador);

        if (contador == 10) {
            bicho.src = estados.fome30;
        }
        if (contador == 20) {
            bicho.src = estados.fome60;
        }

    }, 1000);
}

function alimentar() {
    bicho.src = estados.clicado; 
    contador = 0;
    console.log("Comendo");

    if (time_Click) clearTimeout(time_Click); 
    if (time_Out) clearTimeout(time_Out);    

    time_Click = setTimeout(() => {
        bicho.src = estados.alimentado;

        time_Out = setTimeout(() => {
            bicho.src = estados.normal;
        }, 2000);
    }, 1000);
}

init_cont();