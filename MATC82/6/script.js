//Velocidade e posição do jogador
var playerx = 320,
    playery = 400;
var velocidade = 16;
var indice = 0;

//Jacquin animado
var img = ["Jac1.png", "Jac2.png", "Jac3.png", "Jac4.png"];


//Vetores com a posição das imagens
var posiX = [0, 0, 0, 0, 0, 0, 0];
var posiY = [0, 0, 0, 0, 0, 0, 0];
var posiXCorreto = [0, 0, 0];
var posiYCorreto = [0, 0, 0];

//Pontuação e contador para encerrar
var pontuacao = 0;
var cont = 0;

//Audio para quando encontrar um item
var audioCompleta = new Audio('completetask_0.mp3')

var random = Math.random();
if (random < 0.5) {
    posiX = [570, 300, 150, 100, 440, 32, 384];
    posiY = [370, 270, 175, 350, 125, 352, 240];
    posiXCorreto = [576, 48, 192];
    posiYCorreto = [224, 96, 416];
} else if (random > 0.5 && random < 0.7) {
    posiX = [300, 570, 384, 32, 440, 100, 150];
    posiY = [270, 370, 240, 352, 125, 350, 175];
    posiXCorreto = [192, 576, 48];
    posiYCorreto = [416, 224, 96];
} else {
    posiX = [384, 32, 300, 570, 100, 440, 150];
    posiY = [240, 352, 270, 370, 350, 125, 175];
    posiXCorreto = [48, 192, 576];
    posiYCorreto = [96, 416, 224];
}

alert("Bem vindo à versão Alpha do Pé de Jacquin\nLimpe a cozinha e evite os itens corretos\nTÁ ME OUVINDO??")

$(document).ready(function() {

    setInterval(renderScene, 30);
    setInterval(updateObject, 400);
    $(document).on("keydown", function(event) {

        if (event.key == "ArrowDown") playery += velocidade;
        else if (event.key == "ArrowUp") playery -= velocidade;
        else if (event.key == "ArrowLeft") playerx -= velocidade;
        else if (event.key == "ArrowRight") playerx += velocidade;

        if (distancia(playerx, posiX[0], playery, posiY[0]) < 20) {
            cont++;
            posiX[0] = 1000;
            posiY[0] = 1000;
            pontuacao += 10;
            var audio = new Audio('12horas.mp3');
            tocar(audio);
            tocar(audioCompleta);
            verificaFinal();

        }
        if (distancia(playerx, posiX[1], playery, posiY[1]) < 20) {
            cont++;
            var audio = new Audio('vomitou.mp3');
            tocar(audioCompleta);
            tocar(audio);
            pontuacao += 15;
            posiX[1] = 1000;
            posiY[1] = 1000;
            verificaFinal();
        }
        if (distancia(playerx, posiX[2], playery, posiY[2]) < 20) {
            cont++;
            var audio = new Audio('calaboca.mp4');
            tocar(audioCompleta);
            tocar(audio);
            pontuacao += 15;
            posiX[2] = 1000;
            posiY[2] = 1000;
            verificaFinal();
        }
        if (distancia(playerx, posiX[3], playery, posiY[3]) < 20) {
            cont++;
            var audio = new Audio('pquepariu.mp3');
            tocar(audioCompleta);
            tocar(audio);
            pontuacao += 15;
            posiX[3] = 1000;
            posiY[3] = 1000;
            verificaFinal();
        }
        if (distancia(playerx, posiX[4], playery, posiY[4]) < 20) {
            cont++;
            var audio = new Audio('abreai.mp3');
            tocar(audioCompleta);
            tocar(audio);
            pontuacao += 15;
            posiX[4] = 1000;
            posiY[4] = 1000;
            verificaFinal();
        }
        if (distancia(playerx, posiX[5], playery, posiY[5]) < 20) {
            cont++;
            var audio = new Audio('matargente.mp3');
            tocar(audioCompleta);
            tocar(audio);
            pontuacao += 15;
            posiX[5] = 1000;
            posiY[5] = 1000;
            verificaFinal();
        }
        if (distancia(playerx, posiX[6], playery, posiY[6]) < 20) {
            cont++;
            var audio = new Audio('fechar.mp3');
            tocar(audioCompleta);
            tocar(audio);
            pontuacao += 15;
            posiX[6] = 1000;
            posiY[6] = 1000;
            verificaFinal();
        }
        if (distancia(playerx, posiXCorreto[0], playery, posiYCorreto[0]) < 20) {
            var audio = new Audio('vergonhadaprofissao.mp3');
            tocar(audio);
            pontuacao -= 2;
            alert("VOCÊ É A VERGONHA DA PROFISSION!\nFoque no que está errado!");
        }
        if (distancia(playerx, posiXCorreto[1], playery, posiYCorreto[1]) < 20) {
            var audio = new Audio('temcomonaoouvir.mp3');
            tocar(audio);
            pontuacao -= 7;
            alert("VOCÊ É A VERGONHA DA PROFISSION!\nFoque no que está errado!");
        }
        if (distancia(playerx, posiXCorreto[2], playery, posiYCorreto[2]) < 20) {
            var audio = new Audio('verdade.mp3');
            tocar(audio);
            pontuacao -= 3;
            alert("VOCÊ É A VERGONHA DA PROFISSION!\nFoque no que está errado!");
        }
    });



});

function verificaFinal() {
    if (cont == 7) {
        alert("TÁ ME OUVINDO???\nVocê ganhou!\nPontuação Final: " + pontuacao);
    }
}

function tocar(audio) {
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        this.pause();
    }, false);

    audio.play().catch(function() {});
}


function renderScene() {

    $("canvas").clearCanvas();

    $("canvas").drawImage({
        source: "cenario0.png",
        x: 320,
        y: 240,
        width: 640,
        height: 480
    });

    $("canvas").drawImage({
        source: "iten0.png",
        x: posiX[0],
        y: posiY[0]
    });

    $("canvas").drawImage({
        source: "iten1.png",
        x: posiX[1],
        y: posiY[1]
    });

    $("canvas").drawImage({
        source: "iten2.png",
        x: posiX[2],
        y: posiY[2]
    });

    $("canvas").drawImage({
        source: "iten3.png",
        x: posiX[3],
        y: posiY[3]
    });

    $("canvas").drawImage({
        source: "iten14.png",
        x: posiX[4],
        y: posiY[4]
    });

    $("canvas").drawImage({
        source: "iten4.png",
        x: posiX[5],
        y: posiY[5]
    });

    $("canvas").drawImage({
        source: "rato2.png",
        x: posiX[6],
        y: posiY[6]
    });

    $("canvas").drawImage({
        source: "itencorreto7.png",
        x: posiXCorreto[0],
        y: posiYCorreto[0]
    });

    $("canvas").drawImage({
        source: "itencorreto2.png",
        x: posiXCorreto[1],
        y: posiYCorreto[1]
    });

    $("canvas").drawImage({
        source: "itencorreto6.png",
        x: posiXCorreto[2],
        y: posiYCorreto[2]
    });

    $("canvas").drawImage({
        source: img[indice],
        x: playerx,
        y: playery
    });

    $("canvas").drawText({
        fillStyle: "#FFF",
        x: 105,
        y: 20,
        fontSize: 20,
        fontFamily: 'Arial',
        text: pontuacao
    });

}

function updateObject() {

    indice++;
    if (indice == 4) indice = 0;

}

function distancia(x1, x2, y1, y2) {
    var dist;
    return dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}