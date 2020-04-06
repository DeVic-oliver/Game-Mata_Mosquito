var largura = 0;
var altura = 0;
var vidas = 1;
var tempo = 60;

var criaMosquitoTempo = 1500;

//retorna a url do browser
var nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel === 'normal') {
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil'){
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris'){
    criaMosquitoTempo = 750
}


//Ajusta o tamanho da tela do game
//De acordo com a janela
function ajustarTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}

ajustarTamanhoPalcoJogo();

var cronometro = setInterval(() => {
    tempo--;
    if (tempo <= 0) {
        //Ajuste de intervalo na criação de mosquito
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = '../vitoria.html'
    } else {
       document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

//Gera o mosquito em uma posição aleatória
function posicaoRandom() {

    //Verifica se há um elemento com o mesmo ID
    //Caso exista uma remoção será feita
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = '../Game_Over.html';
        } else {
            document.getElementById('v' + vidas).src = '../imagens/coracao_vazio.png';
            vidas++;
        }
    }

    //Gerando posição aleatória X e Y
    // .. -90 aplica uma margem de segurança
    //Evitar estouro da imagem na janela
    var posX = Math.floor(Math.random() * largura) - 90;
    var posY = Math.floor(Math.random() * altura) - 90;

    //Operador ternário if else
    posX = posX < 0 ? 0 : posX;
    posY = posY < 0 ? 0 : posY;

    //Criar elemento img
    //Setando propriedades
    var mosquito_img = document.createElement('img');
    mosquito_img.src = '../imagens/mosca.png';
    mosquito_img.className = tamanhoRandom() + " " + ladoRandom();
    mosquito_img.style.position = 'absolute';
    mosquito_img.style.top = posY + 'px';
    mosquito_img.style.left = posX + 'px';
    mosquito_img.id = 'mosquito';

    mosquito_img.onclick = function () {
        this.remove();
    }


    //Adicionando elemento ao body
    document.body.appendChild(mosquito_img);
}

function tamanhoRandom() {
    //Gerando tamanho aleatório da img
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1';

        case 1:
            return 'mosquito2';

        case 2:
            return 'mosquito3';
    }
}

//Alterna para que lado o mosquito está olhando
function ladoRandom() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA';

        case 1:
            return 'ladoB';
    }
}