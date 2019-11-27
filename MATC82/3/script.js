var inimigos = new Array();
var balas = new Array();
var municoes = new Array();
var balasRemover = new Array();
var inimigosRemover = new Array();
let texto = " ";
let minutos = "";
let segundos = "";
let tempoDeSessao = 0;
let jogoEmAndamento = false
let restart = false;
let mensagem = ""


function partida(){
	texto = "Jogador: " + jogador.getNome() + "| Level: | Tempo: :";
	jogador.setNome(window.prompt("Qual seu nome?"));
	jogador.setLevel(1);
	jogador.setPontuacao(0);
	jogador.setVelocidadeMax(3);
	jogoEmAndamento = true;
	tempoDeSessao = 0;
	movBG = 0;
	velBG = 0.5;
	if(restart){
		removerTodasBalas();
		removerTodosInimigos();
		removerTodasMunicoes();
		clearInterval(contaTempo);
		clearInterval(levelUp);
		clearInterval(intervalInimigos);
		clearInterval(intervalMunicao);
		clearInterval(renderGame);
		clearInterval(trilha);
	}
	let contaTempo = setInterval(timer, 1000);
	let levelUp = setInterval(passaDeLevel, 15000);
	let intervalInimigos = setInterval(criarInimigos, 1000);
	let intervalMunicao = setInterval(criarMunicao, 5000);
	let renderGame = setInterval(renderiza, 15);
	TocarSom();
	let trilha = setInterval(TocarSom, 32000);
}

function TocarSom(){
	let soundtrack = new Audio('spacesound.wav');
	soundtrack.play();
}

function timer() {
	if(jogoEmAndamento){
		tempoDeSessao++;
	}
	minutos = parseInt(tempoDeSessao / 60);
	minutos =  minutos < 10 ? "0" + minutos : minutos;
	segundos = (tempoDeSessao % 60) < 10 ? "0" + tempoDeSessao % 60 : tempoDeSessao % 60;
	texto = "Jogador: "+ jogador.getNome() + " | Level: "+ jogador.getLevel() + " | Tempo: " + minutos + ":" + segundos;
}


function jogadorVenceu(){
	window.alert("FIM DE JOGO!")
	mensagem = "Voce venceu! Parabens!";
	jogoEmAndamento = false;
	restart = true;
	telaInicial();
	$("#tela").on("click", function(event) {
		novoJogo();
	})
}

//Passa o jogador para o proximo level
function passaDeLevel(){
	if(jogoEmAndamento==true){
		jogador.setLevel(jogador.getLevel()+1);
		jogador.setPontuacao(jogador.getPontuacao()+(1000*jogador.getLevel()));
		jogador.setVelocidadeMax(jogador.getVelocidadeMax()*1.1);
		velBG += 0.4;
	}
}

//Inteiro randomico i, sendo min<= i <max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//classe bala
class bala{
	constructor(){
		this.source = 'sprites/bala.png';
		this.x = jogador.getX();
		this.y = jogador.getY()-50;
	}
	getSource(){
		return this.source;
	}
	setX(x){
		this.x = x;
	}
	getX(){
		return this.x;
	}
	setY(y){
		this.y = y;
	}
	getY(){
		return this.y;
	}
}

function randomChoice(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}


let paraEsq = [2, 5, 7];
let paraDir = [1, 6, 8];
let paraSul = [4, 7, 8];
let paraNor = [3, 5, 6];
// Classe inimigo
class inimigo{
	constructor(){
		this.source = "sprites/Inimiga"+jogador.getLevel()+".png";
		let opcao = getRandomInt(1,4);
		switch(opcao){
		case(1): // Nasce no leste
			this.x = 770;
			this.y = Math.random()*600;
			this.direcao = randomChoice(paraEsq);
			break;
		case(2): // Nasce no oeste
			this.x = 30;
			this.y = Math.random()*600;
			this.direcao = randomChoice(paraDir);
			break;	
		case(3): // Nasce no norte
			this.x = Math.random()*800;
			this.y = 30;
			this.direcao = randomChoice(paraSul);
			break;
		/*case(4): // Nasce no sul
			this.x = Math.random()*600;
			this.y = 570;
			this.direcao = getRandomInt(1,8);
			break;*/
		}

		let opcao2 = Math.random();
		if(opcao2<0.2){
			this.velocidade = 0.5;
		}else{
			this.velocidade = opcao2;
		}
	}
	getVelocidade(){
		return this.velocidade;
	}
	getDirecao(){
		return this.direcao;
	}
	setSource(source){
		this.source = source;
	}
	getSource(){
		return this.source;
	}
	setX(x){
		this.x = x;
	}
	getX(){
		return this.x;
	}
	setY(y){
		this.y = y;
	}
	getY(){
		return this.y;
	}
}

//classe municao
class municao{
	constructor(){
		this.source = 'sprites/municao.png';
		let opcao = getRandomInt(1,5);
		switch(opcao){
		case(1): // Nasce no leste
			this.x = 770;
			this.y = Math.random()*600;
			this.direcao = randomChoice(paraEsq);
			break;
		case(2): // Nasce no oeste
			this.x = 30;
			this.y = Math.random()*600;
			this.direcao = randomChoice(paraDir);
			break;	
		case(3): // Nasce no norte
			this.x = Math.random()*800;
			this.y = 30;
			this.direcao = randomChoice(paraSul);
			break;
		case(4): // Nasce no sul
			this.x = Math.random()*600;
			this.y = 570;
			this.direcao = randomChoice(paraNor);
			break;
		}
		this.qt = 30;
	}
	getQt(){
		return this.qt;
	}
	setSource(source){
		this.source = source;
	}
	getSource(){
		return this.source;
	}
	getDirecao(){
		return this.direcao;
	}
	getSource(){
		return this.source;
	}
	setX(x){
		this.x = x;
	}
	getX(){
		return this.x;
	}
	setY(y){
		this.y = y;
	}
	getY(){
		return this.y;
	}
}

//Classe player
class player{
	constructor(nome){
		this.nome = nome;
		this.x = 320;
		this.y = 240;
		this.level = 1;
		this.pontuacao = 0;
		this.velocidadeMax = 3;
		this.municao = 30;
	}
	setMunicao(municao){
		this.municao = municao;
	}
	getMunicao(){
		return this.municao;
	}
	setVelocidadeMax(velocidadeMax){
		this.velocidadeMax = velocidadeMax;
	}
	getVelocidadeMax(){
		return this.velocidadeMax;
	}
	getPontuacao(){
		return this.velocidadeMax;
	}
	getPontuacao(){
		return this.velocidadeMax;
	}
	setPontuacao(pontuacao){
		this.pontuacao = pontuacao;
	}
	getPontuacao(){
		return this.pontuacao;
	}
	setLevel(level){
		this.level = level;
	}
	getLevel(){
		return this.level;
	}
	setNome(nome){
		this.nome = nome;
	}
	getNome(){
		return this.nome;
	}
	setX(x){
		this.x = x;
	}
	getX(){
		return this.x;
	}
	setY(y){
		this.y = y;
	}
	getY(){
		return this.y;
	}
}

// Funcao atirar, adiciona uma bala no vetor balas e decrementa as municoes do player
function atirar(){
	if(jogoEmAndamento==true){
		if(jogador.getMunicao()>0){
			let audio = new Audio('tiroLaser.wav');
			audio.play();
			jogador.setMunicao(jogador.getMunicao()-1);
			balas.push(new bala);
		}
	}
}

// Movimenta a bala para o norte
function andarBala(item, indice, balas){
	balas[indice].setY(balas[indice].getY()-8);
}

// Movimenta o inimigo de acordo com sua direcao
function andarInimigo(item, indice, inimigos){
	switch(inimigos[indice].getDirecao()){
	case(1): // Andar para leste
		inimigos[indice].setX(inimigos[indice].getX()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(2): // Andar para oeste
		inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(3): // Andar para norte
		inimigos[indice].setY(inimigos[indice].getY()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(4): // Andar para sul
		inimigos[indice].setY(inimigos[indice].getY()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(5): // Andar para noroeste
		inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		inimigos[indice].setY(inimigos[indice].getY()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(6): // Andar para nordeste
		inimigos[indice].setX(inimigos[indice].getX()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		inimigos[indice].setY(inimigos[indice].getY()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(7): // Andar para sudoeste
		inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		inimigos[indice].setY(inimigos[indice].getY()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	case(8):  // Andar para sudeste
		inimigos[indice].setX(inimigos[indice].getX()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		inimigos[indice].setY(inimigos[indice].getY()+jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
		break;
	default:
	 	inimigos[indice].setX(inimigos[indice].getX()-jogador.getVelocidadeMax()*inimigos[indice].getVelocidade());
	 	break;
	}
}

// Movimenta o inimigo de acordo com sua direcao
function andarMunicao(item, indice, municoes){
	if(jogoEmAndamento==true){
		switch(municoes[indice].getDirecao()){
		case(1): // Andar para leste
			municoes[indice].setX(municoes[indice].getX()+5);
			break;
		case(2): // Andar para oeste
			municoes[indice].setX(municoes[indice].getX()-5);
			break;
		case(3): // Andar para norte
			municoes[indice].setY(municoes[indice].getY()-5);
			break;
		case(4): // Andar para sul
			municoes[indice].setY(municoes[indice].getY()+5);
			break;
		case(5): // Andar para noroeste
			municoes[indice].setX(municoes[indice].getX()-5);
			municoes[indice].setY(municoes[indice].getY()-5);
			break;
		case(6): // Andar para nordeste
			municoes[indice].setX(municoes[indice].getX()+5);
			municoes[indice].setY(municoes[indice].getY()-5);
			break;
		case(7): // Andar para sudoeste
			municoes[indice].setX(municoes[indice].getX()-5);
			municoes[indice].setY(municoes[indice].getY()+5);
			break;
		case(8):  // Andar para sudeste
			municoes[indice].setX(municoes[indice].getX()+5);
			municoes[indice].setY(municoes[indice].getY()+5);
			break;
		default:
			municoes[indice].setX(municoes[indice].getX()-5);
		 	break;
		}
	}
}

// Fazem os inimigos que estao no vetor de inimigos andarem
function balasAndam(){
	balas.forEach(andarBala);

}

// Fazem os inimigos que estao no vetor de inimigos andarem
function inimigosAndam(){
	if(jogoEmAndamento==true){
		inimigos.forEach(andarInimigo);
	}
}

// Fazem os inimigos que estao no vetor de inimigos andarem
function municoesAndam(){
	if(jogoEmAndamento==true){
		municoes.forEach(andarMunicao);
	}
}

// 
function balaColidiu(){
	for(var i=0 ; i<balas.length ; i++){
		for(var j=0 ; j<inimigos.length ; j++){
			if(Math.sqrt(Math.pow((balas[i].getX() - inimigos[j].getX()), 2) + Math.pow((balas[i].getY() - inimigos[j].getY()), 2)) < 100 / 2 && jogoEmAndamento==true){
				let audio = new Audio('tiroPegou.wav');
				audio.play();
				jogador.setPontuacao(jogador.getPontuacao()+300)
				balasRemover.push(i);
				inimigosRemover.push(j);
			}
		}
	}
	for(var i=0; i<balasRemover.length;i++){
		balas.splice(parseInt(balasRemover[i], 10), 1);
	}
	balasRemover.forEach(removeDoArray);
	for(var i=0; i<inimigosRemover.length;i++){
		inimigos.splice(parseInt(inimigosRemover[i], 10), 1);
	}
	inimigosRemover.forEach(removeDoArray);
}

function animacaoExplosao(indice, array){
			setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao1.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 40,
			height: 40
		}); }, 100);
				setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao1.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 80,
			height: 80
		}); }, 200);
			setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao1.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 140,
			height: 140
		}); }, 300);
		setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao2.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 400);
			setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao3.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 500);
					setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao2.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 600);
			setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao3.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 700);
					setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao2.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 800);
			setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao3.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 900);

				setTimeout(function() { 		
		$("#game").drawImage({
			source: 'sprites/explosao4.png',
			x: array[indice].getX(),
			y: array[indice].getY(),
			width: 200,
			height: 200
		}); }, 1000);
}

// 
function colisaoMunicao(item, indice, municoes){
	if(Math.sqrt(Math.pow((jogador.getX() - municoes[indice].getX()), 2) + Math.pow((jogador.getY() - municoes[indice].getY()), 2)) < 100 / 2 && jogoEmAndamento == true){
		let audio = new Audio('municao.wav');
		audio.play();
		jogador.setMunicao(jogador.getMunicao()+municoes[indice].getQt());
		municoes.splice(indice, 1);
	}
}

// 
function municaoColidiu(){
	municoes.forEach(colisaoMunicao);
}

// Calcula colisao
function colisaoPlayer(item, indice, inimigos){
	if(Math.sqrt(Math.pow((jogador.getX() - inimigos[indice].getX()), 2) + Math.pow((jogador.getY() - inimigos[indice].getY()), 2)) < 100 / 2 && jogoEmAndamento == true){
		inimigos[indice].setSource("sprites/explosao.png");
		let audio = new Audio('playerColidiu.wav');
		audio.play();
		animacaoExplosao(indice, inimigos);
		jogoEmAndamento = false;
		setTimeout(gameOver, 1000);
	}
}

function gameOver(){
	mensagem = "Voce colidiu e perdeu! Voce fez " + jogador.getPontuacao() + " pontos. Tente novamente.";
	telaInicial();
	restart = true;
	$("#tela").on("click", function(event) {
		novoJogo();
	})
}

// Verifica se o jogador colidiu com algum inimigo
function jogadorColidiu(){
	inimigos.forEach(colisaoPlayer);
}

//renderiza arrays
function renderiza(){
	// Limpa tela
	if(jogoEmAndamento){
		$("#game").clearCanvas();
		removerBalasForaDaTela();
		removerInimigosForaDaTela();
		removerMunicoesForaDaTela();
		renderizaCanvas2();
		renderizaCanvas();
		renderizaPlanoDeFundo();
		renderizaPlayer();
		renderizaInimigos();
		renderizaMunicoes();
		renderizaBalas();
		renderizaTempo();
		renderizaPlacar();
		jogadorColidiu();
		municaoColidiu();
		balaColidiu();
		if(jogador.getLevel()>14){
			jogadorVenceu()
		}
	}
}

// Renderiza o plano de fundo
let movBG = 0;
let velBG = 0.5;
function renderizaPlanoDeFundo(){
	if(movBG > 600){
		movBG = 0;
	}
	$("#game").drawImage({
		source: 'paginaBG3.jpg',
		x: 400,
		y: movBG += velBG,
		width: $("#game").width(),
		height: $("#game").height()*4
	});
}

// Renderiza o jogador
function renderizaPlayer(){
	$("#game").drawImage({
	source: 'sprites/naveMC.png',
	x: jogador.getX(),
	y: jogador.getY(),
	width: 80,
	height: 80
	});
}

// Renderiza o canvas
function renderizaCanvas(){
	$("#game").drawRect({
	fillStyle: "#000",
	x: 400,
	y: 300,
	width: 800,
	height: 600
	});
}

// Renderiza a contagem do tempo
function  renderizaTempo(){
	$("#placar").drawText({
	fillStyle: "#FFF",
	x: ($("#game").width()/4)+40, 
	y: 20,
	fontSize: 20,
	fontFamily: 'Arial',
	text: texto
	});
}

function renderizaPlacar(){
	$("#placar").drawText({
		fillStyle: "#FFF",
		x: (($("#game").width()/2)+($("#game").width()/4)+40),
		y: 20,
		fontSize: 20,
		fontFamily: 'Arial',
		text: "Pontuacao: " + jogador.getPontuacao()+ " " + "| Municao: " + jogador.getMunicao()
	});
}


// Renderiza o canvas
function renderizaCanvas2(){
	$("#placar").drawRect({
	fillStyle: "#000",
	x: 400,
	y: 300,
	width: 800,
	height: 600,
	});
}


// Renderiza as balas que estao no vetor de balas
function renderizaBalas(){
	balas.forEach(desenhaBala);
	balasAndam();
}

// Renderiza os inimigos que estao no vetor de inimigos
function renderizaInimigos(){
	inimigos.forEach(desenhaInimigo);
	inimigosAndam();
}

// Renderiza as municoes que estao no vetor de municoes
function renderizaMunicoes(){
	municoes.forEach(desenhaMunicao);
	municoesAndam();
}

// Desenha bala
function desenhaBala(item, indice, balas){
		$("#game").drawImage({
		source: 'sprites/bala.png',
		x: balas[indice].getX(),
		y: balas[indice].getY(),
		width: 8,
		height: 25
	});
}

// Desenha o inimigo
function desenhaInimigo(item, indice, inimigos){
		$("#game").drawImage({
		source: inimigos[indice].getSource(),
		x: inimigos[indice].getX(),
		y: inimigos[indice].getY(),
		width: 80,
		height: 80
	});
}

// Desenha municao
function desenhaMunicao(item, indice, municoes){
		$("#game").drawImage({
		source: 'sprites/municao.png',
		x: municoes[indice].getX(),
		y: municoes[indice].getY(),
		width: 50,
		height: 50
	});
}

function criarMunicao(){
	if(jogoEmAndamento==true){
		municoes.push(new municao);
	}
}

// Cria inimigos
function criarInimigos(){
	if(jogoEmAndamento==true){
		if(jogador.getLevel()<3){
			for(var qt = 1; qt <= jogador.getLevel(); qt++) {
				inimigos.push(new inimigo);
			}
		}else{
			inimigos.push(new inimigo);
			inimigos.push(new inimigo);
			inimigos.push(new inimigo);
			inimigos.push(new inimigo);
		}
	}	
}

// Remove todos os inimigos do vetor de inimigos
function removeDoArray(item, indice, array){
	array.splice(indice, 1);
}

// Remove o inimigo que saiu da tela do vetor de inimigos
function removeInimigoForaDaTela(item, indice, inimigos){
	if(inimigos[indice].getX<0 || inimigos[indice].getX>800 || inimigos[indice].getY<0 || inimigos[indice].getY<600){
		inimigos.splice(indice, 1);
	}
}

// Remove o inimigo que saiu da tela do vetor de inimigos
function removeBalaForaDaTela(item, indice, balas){
	if(balas[indice].getY<0){
		balas.splice(indice, 1);
	}
}

// Remove a municao que saiu da tela do vetor de municoes
function removeMunicaoForaDaTela(item, indice, municoes){
	if(municoes[indice].getX<0 || municoes[indice].getX>800 || municoes[indice].getY<0 || municoes[indice].getY<600){
		municoes.splice(indice, 1);
	}
}

// Remove todas as balas
function removerTodasBalas(){
	balas.forEach(removeDoArray);
}

// Romove todos os inimigos
function removerTodosInimigos(){
	inimigos.forEach(removeDoArray);
}

// Remove todas as municoes
function removerTodasMunicoes(){
	municoes.forEach(removeDoArray);
}

// Verifica quais balas sairam da tela
function removerBalasForaDaTela(){
	balas.forEach(removeBalaForaDaTela);
}

// Verifica quais inimigos sairam da tela
function removerInimigosForaDaTela(){
	inimigos.forEach(removeInimigoForaDaTela);
}

// Verifica quais municoes sairam da tela
function removerMunicoesForaDaTela(){
	municoes.forEach(removeMunicaoForaDaTela);
}


function telaInicial(){
	$("#tela").show();
	$("#tela").css("cursor", "pointer");
	$("#tela").drawImage({
		source: "paginaBG.jpg",
		x: 400,
		y: 300,
		width: 1100,
		height: 650
	});
	$("#tela").drawText({
		fillStyle: "#FFF",
		x: ($("#game").width()/2), 
		y: 110,
		fontSize: 20,
		fontFamily: 'Arial',
		text: mensagem
	});
}

function novoJogo(){
	$("#tela").clearCanvas();
	$("#tela").hide();
	// Remove todas as balas
	jogador = new player();
	partida();
}

$(document).ready(function() {
	$("#game").css("cursor", "none");
	$("#game").on("mousemove", function(event) {
		jogador.setX(event.pageX - ($("body").width() - $("canvas").width())/2);
		jogador.setY(event.pageY-40);
	});
	$("#game").on({
		click: function() {atirar();}
	});
	if(!jogoEmAndamento){
		telaInicial();
		$("#tela").on("click", function(event) {
			novoJogo();
		})
	};
});