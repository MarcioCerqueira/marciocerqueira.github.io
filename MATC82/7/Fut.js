var palavra = "", tentativa = "";
var ini = 200; l = 0, m = 0, flag = 0;
var boneco = ["cabeca.jpeg", "tronco.jpeg", "bracoe.jpeg", "bracod.jpeg", "pee.jpeg", "ped.jpeg" ];
var erro = 0, acerto = 0, check = 0, comeco = 0, espaco = 0, resto;
var name = "Digite uma letra: ";
$(document).ready(function() {

	$("canvas").drawImage({source: 'forca.png',	x: 150,	y: 300, width: 200, height: 500}); //Desenha a forca
	$("canvas").drawImage({source: 'logo.png',	x: 650,	y: 300, width: 750, height: 400}); //Desenha o logo
	var audio = new Audio('musicafundo.mpeg');

		audio.addEventListener('ended', function (){
			this.currentTime = 0;
			this.play();
		}, false);

	audio.play().catch(function() {});

	$("#nac").click(function(){ //Escolhendo times nacionais
		tema = "nacional";
		if(comeco == 1){
			location.reload(); //Se sim, recarrega
		} else {
			comeco = 1;
			var ntx = $("canvas")[0].getContext("2d");
			ntx.clearRect(275, 100, 1025, 500);
			inicio(); //Iniciando o jogo
		}
	})

	$("#ext").click(function(){ //Escolhendo times estrangeiros
		tema = "estrangeiro";
		if(comeco == 1){
			location.reload(); //Se sim, recarrega
		} else {
			comeco = 1;
			var etx = $("canvas")[0].getContext("2d");
			etx.clearRect(275, 100, 1025, 500);
			inicio(); //Iniciando o jogo
		}
	})

});

function inicio(){
	palpite(); //Escreve "Digite uma letra"

	setInterval(renderScene, 30); //Inicia o tempo com a bola

	$.get("times.json", function(objeto){ //Sorteia a palavra
		if(tema == "nacional"){ //Times do Brasil
			var alet = Math.floor(Math.random()*objeto.palavras[0].nacional.length); //Variável aleatória
			palavra = objeto.palavras[0].nacional[alet].time; //Palavra escolhida
			resto = palavra.length; //Quantidade de letras
			for (i =0; i < resto; i++){ //Desenhando as linhas onde serão escritas as letras
				if (palavra[i] ==" "){
					$("canvas").drawLine({strokeStyle: "transparent", strokeWidth: 5, closed: "true", x1: ini+(i*70), y1: 500, x2: ini+50+(i*70), y2: 500});
					espaco++;
				} else {
					$("canvas").drawLine({strokeStyle: "red", strokeWidth: 5, closed: "true", x1: ini+(i*70), y1: 500, x2: ini+50+(i*70), y2: 500});
				}

			}

		} else if (tema == "estrangeiro"){//Times de fora do Brasil
			var alet = Math.floor(Math.random()*objeto.palavras[1].estrangeiro.length); //Variável aleatória
			palavra = objeto.palavras[1].estrangeiro[alet].time; //Palavra escolhida
			resto = palavra.length; //Quantidade de letras
			for (i =0; i < resto; i++){ //Desenhando as linhas onde serão escritas as letras
				if (palavra[i] ==" "){
					$("canvas").drawLine({strokeStyle: "transparent", strokeWidth: 5, closed: "true", x1: ini+(i*70), y1: 500, x2: ini+50+(i*70), y2: 500});
					espaco++;
				} else {
					$("canvas").drawLine({strokeStyle: "red", strokeWidth: 5, closed: "true", x1: ini+(i*70), y1: 500, x2: ini+50+(i*70), y2: 500});
				}
			}
		}
	});
}

//Capturar as letras digitadas
$(document).keypress(function(e) {
	if (comeco == 1){
		if(flag == 0){
			var letra = parseInt(e.which);
			if((letra>= 65 && letra<=90) || (letra>= 97 && letra<=122)){ //Só permite letras
				name = String.fromCharCode(letra).toUpperCase();
				if (tentativa.match(name) == name){ //Confere se já foi uma letra tentada anteriormente
					alert("Você já tentou esse letra! Por favor, escolha outra!");
				} else {
					l++;
					palpite();
					checar();
					tentativa = tentativa + name;
				}
			} else {
				alert("Você deve digitar uma letra de A a Z");
			}
		}
	}
});

// conferir se a letra faz parte da palavra
function checar(){
	check = 0;
	for (var j = 0; j<palavra.length; j++){
		if (palavra[j]== name){
			//Se fizer parte, escreve a letra na linha da palavra
			var audio = new Audio('acerto.mp3');
			audio.play();
			$("canvas").drawText({text: name, fillStyle: "white", fontSize: 50, x: ini+25+(j*70), y: 480});
			check = 1;
			resto--;
			if ((resto-espaco) == 0){
				ganhar();
			}
		} 
	}
	//Se não fizer parte, chama a função errar para desenhar o boneco
	if (check == 0){
		var audio = new Audio('erro.mp3');
		audio.play();
		errar();
	}
}
// Lista as letras já tentadas
function palpite(){
	$("canvas").drawRect({fillStyle: "transparent", x: 840, y: 100, width: 800, height: 50});
	if (l == 0){
		//Primeiro escreve "Digite uma letra"
		$("canvas").drawText({text: name, fillStyle: "white", fontSize: 30, x: 400, y: 100})
	} else {
		//Depois escreve cada letra tentada
		$("canvas").drawText({text: name, fillStyle: "white", fontSize: 30, x: 502+(l*30), y: 100})
	}
}

function errar(){
	switch(erro){
		case 0: 
			$("canvas").drawImage({source: boneco[erro], x: 210, y: 300, width: 72.5, height: 99});
			break;
		case 1:
			$("canvas").drawImage({source: boneco[erro], x: 210, y: 372, width: 49, height: 61});
			break;
		case 2:
			$("canvas").drawImage({source: boneco[erro], x: 176, y: 373, width: 18, height: 60});
			break;
		case 3:
			$("canvas").drawImage({source: boneco[erro], x: 243, y: 373, width: 18, height: 60});
			break;
		case 4:
			$("canvas").drawImage({source: boneco[erro], x: 185, y: 418, width: 48, height: 31});
			break;
		default:
			$("canvas").drawImage({source: boneco[erro], x: 235, y: 418, width: 48, height: 31});
			var audio = new Audio('vaias.wav');
			audio.play();
			$("canvas").drawText({text: "Vai treinar perna de pau!", fillStyle: "rgb(255,0,0)", fontSize: 60, x: 640, y: 250});
			for (var j = 0; j<palavra.length; j++){
				$("canvas").drawText({text: palavra[j], fillStyle: "white", fontSize: 50, x: ini+25+(j*70), y: 480});
			}
			flag =1;
			$("canvas").drawRect({fillStyle: "transparent", x: 640, y: 650, width: 100, height: 50});
			$("canvas").drawText({text: "Novo jogo", id: "new", fillStyle: "black", fontSize: 30, x: 640, y: 650}).click(function() {
				location.reload();
			});

	}
	erro++;
}

function ganhar(){
	var audio = new Audio('comemoracao.wav');
	audio.play();
	$("canvas").drawText({text: "Paranéns, campeão! Você é craque!", fillStyle: "rgb(0,255,0)", fontSize: 60, x: 640, y: 250});
	$("canvas").drawText({text: "Novo jogo", id: "new", fillStyle: "black", fontSize: 30, x: 640, y: 650}).click(function() {
		location.reload();
	});
	flag = 1;
}
//Marca o tempo, descendo a bola
function renderScene() {
	if(m<648 && flag == 0){
		m = m+0.5;
		var ctx = $("canvas")[0].getContext("2d");
		ctx.clearRect(1170, 0, 1230, 768);
		$("canvas").drawImage({source: 'bola.png', x: 1200, y: 30+m, width: 60, height: 60});
	} else if (m<648 && flag == 1){
		var ctx = $("canvas")[0].getContext("2d");
		ctx.clearRect(1170, 0, 1230, 768);
		$("canvas").drawImage({source: 'bola.png', x: 1200, y: 30+m, width: 60, height: 60});
	} else{
		errar(5);
	}

}