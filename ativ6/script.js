const bicho = document.getElementById('bicho'); 
const btn = document.getElementById('btn');

const estados = {
    normal: 'bichinho.png',
    clicado: 'bichinho_feliz.png',
    comendo: 'img/b_comendo.png',
    alimentado: 'img/b_a.png',
    fome30: 'img/b_f30.png',
    fome60: 'img/b_f60.png',
}

let contador = 0;
let intervalo = null;
let time_click = null;
let time_out = null;

function changeImage() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        contador++;
        console.log("Tempo:", contador);

        if (contador === 10) {
            bicho.src = estados.fome30;
        }

        if (contador === 20) {
            bicho.src = estados.fome60;
        }

    }, 1000);
}

function alimentar() {

    bicho.src = estados.comendo;
    contador = 0;
    console.log("Comendo");

    if (time_click) clearTimeout(time_click);
    if (time_out) clearTimeout(time_out);

    time_click = setTimeout(() => {

        bicho.src = estados.alimentado;
        console.log("Alimentado");

        time_out = setTimeout(() => {
            bicho.src = estados.normal;
            console.log("Parou de comer");
        }, 2000);

    }, 1000);

}

changeImage();