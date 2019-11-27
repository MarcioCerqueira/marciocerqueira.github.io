$(document).ready(() => {

    var intervalJogo = null;
    
    var matriz = [];
    
    var sentidos = ["cima", "baixo", "esquerda", "direita"]; // Feito para gerar aleatoriedade no sentido inicial
    
    var comecouAJogar = false;

    // Estado inicial da cobra
    var cobra = {
        corpo: []
    }; 

    var novoCorpoCobra = () => {
      return {
        x: null,
        y: null,
        sentido: null
      };
    };

    function adicionarCorpo() {
        console.log("Adicionou corpo.");
        var novoCorpo = novoCorpoCobra();
        calcularXYSentido(cobra.corpo, novoCorpo)
        cobra.corpo.push(novoCorpo);
    }

    function calcularXYSentido (corpo, novoCorpo) {
        var ultimoCorpo = corpo[corpo.length-1];
    
        novoCorpo.sentido = ultimoCorpo.sentido;
    
        switch (ultimoCorpo.sentido) {
            case "cima":
                novoCorpo.x = ultimoCorpo.x + 1;
                novoCorpo.y = ultimoCorpo.y;
                break;
            case "baixo":
                novoCorpo.x = ultimoCorpo.x - 1;
                novoCorpo.y = ultimoCorpo.y;
                break;
            case "esquerda":
                novoCorpo.x = ultimoCorpo.x;
                novoCorpo.y = ultimoCorpo.y + 1;
                break;
            case "direita":
                novoCorpo.x = ultimoCorpo.x;
                novoCorpo.y = ultimoCorpo.y - 1;
                break;
        }
        if(novoCorpo.x == corpo[0].x && novoCorpo.y == corpo[0].y) {
            perderJogo();
            return;
        }
    }
    
    function resetarJogo() {
        gerarMatriz();
        gerarComida();
    
        cobra.corpo = [];
    
        cobra.corpo[0] = novoCorpoCobra();
        cobra.corpo[0].sentido = sentidos[getRandomArbitrary(0, 3)];
        cobra.corpo[0].x = getRandomArbitrary(0, 49);
        cobra.corpo[0].y = getRandomArbitrary(0, 49);
    
        for(var i=0; i<3; i++) {
            adicionarCorpo();
        }
        criarInterval();
    }

    function perderJogo() {
        perdeuJogo = true;
        comecouAJogar = false;
        document.getElementById("mainsong").pause();
        document.getElementById("mainsong").load();
        document.getElementById("perdeusong").play();
        matarInterval();
        setTimeout(() => {
            if(confirm("Game over! Deseja reiniciar?")) {
                resetarJogo();
                return;
            }
        }, 500);
    }
    
    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function criarInterval () {
        console.log("Criou interval");
        intervalJogo = setInterval(() => {
            //zerarMatriz();
            cobraAndar();
            cobra.corpo.forEach(corpo => {
                matriz[corpo.x][corpo.y] = 1;
            });
    
            
            for (var i = 0; i < 50; i++) {
                for (var j = 0; j < 50; j++) {
                    if(matriz[i][j] == "0") {
                        $("canvas").drawRect({
                            fillStyle: "#6c3",
                            x: j + (15 * j) + 7, y: i + (15 * i) + 7,
                            width: 15,
                            height: 15
                          });
                    }
                    else if(matriz[i][j] == "1") {
                        $("canvas").drawRect({
                            fillStyle: "#148",
                            x: j + (15 * j) + 7, y: i + (15 * i) + 7,
                            width: 15,
                            height: 15
                          });
                    }
                    else if(matriz[i][j] == "2") {
                        $("canvas").drawRect({
                            fillStyle: "#c00",
                            x: j + (15 * j) + 7, y: i + (15 * i) + 7,
                            width: 15,
                            height: 15
                          });
                    }
                }
            }
        }, 200);
    }
    
    function matarInterval () {
        console.log("Matou interval");
        if(intervalJogo != null) {
            clearInterval(intervalJogo);
        }
    }

    function gerarMatriz() {
        for (var i = 0; i < 50; i++) {  // Gerando a matriz inicial
            matriz[i] = [];
            for (var j = 0; j < 50; j++) {
              matriz[i].push("0");
            }
          }
    }
    
    function cobraAndar() {
        // Armazenando valores antigos do ultimo corpo que foi alterado.
    
        var ultimoCorpoMudadox = null;
        var ultimoCorpoMudadoy = null;
        var ultimoCorpoMudadosentido = null;
    
        cobra.corpo.forEach((parteCorpo, index) => {
            matriz[parteCorpo.x][parteCorpo.y] = "0";
            if(index == 0) { // Se for a cabeça da cobra
                ultimoCorpoMudadox = parteCorpo.x;
                ultimoCorpoMudadoy = parteCorpo.y;
                ultimoCorpoMudadosentido = parteCorpo.sentido;
                switch (parteCorpo.sentido) {
                    case "cima":
                            parteCorpo.x = parteCorpo.x - 1 < 0? 49 : parteCorpo.x - 1;
                        break;
                    case "baixo":
                            parteCorpo.x = parteCorpo.x + 1 > 49? 0 : parteCorpo.x + 1;
                        break;
                    case "esquerda":
                            parteCorpo.y = parteCorpo.y - 1 < 0? 49 : parteCorpo.y - 1;
                        break;
                    case "direita":
                            parteCorpo.y = parteCorpo.y + 1 > 49? 0 : parteCorpo.y + 1;
                        break;
                }
    
                if(matriz[parteCorpo.x][parteCorpo.y] == "2") {
                    console.log("Cobra comeu!");
                    document.getElementById("comeusong").play();
                    adicionarCorpo();
                    gerarComida();
                }
                else if(matriz[parteCorpo.x][parteCorpo.y] == "1") {
                    perderJogo();
                    return;
                }
            }
            else {
                var aux;
    
                aux = parteCorpo.sentido;
                parteCorpo.sentido = ultimoCorpoMudadosentido;
                ultimoCorpoMudadosentido = aux;
    
                aux = parteCorpo.x;
                parteCorpo.x = ultimoCorpoMudadox;
                ultimoCorpoMudadox = aux;
    
    
                aux = parteCorpo.y;
                parteCorpo.y = ultimoCorpoMudadoy;
                ultimoCorpoMudadoy = aux;
    
            }
        });
    }
    
    function gerarComida () {
        var jogoAcabou = true;
    
        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < 50; j++) {
                if(matriz[i][j] != "1") {
                    jogoAcabou = false;
                }
            }
            if(!jogoAcabou) {
               break;
            }
        }
    
        if(jogoAcabou) {
            alert("Parabéns, você venceu!");
            matarInterval();
            return;
        }
    
        var xGerado = getRandomArbitrary(0,49);
        var yGerado = getRandomArbitrary(0,49);
        while(matriz[xGerado][yGerado] == "1") {
            xGerado = getRandomArbitrary(0,49);
            yGerado = getRandomArbitrary(0,49);
        }
    
        matriz[xGerado][yGerado] = "2";
    }
    
    // Pegando evento do teclado
    $(document).on("keyup", (e) => {

        if(!comecouAJogar) {     
            document.getElementById("mainsong").play();
            comecouAJogar = true;
        }

        console.log(e);
        switch(e.key) {
            case "ArrowUp":
                cobra.corpo[0].sentido = "cima";
                break;
            case "ArrowDown":
                cobra.corpo[0].sentido = "baixo";
                break;
            case "ArrowLeft":
                cobra.corpo[0].sentido = "esquerda";
                break;
            case "ArrowRight":
                cobra.corpo[0].sentido = "direita";
                break;
        }
    });

    resetarJogo(); // Iniciando o game.
});