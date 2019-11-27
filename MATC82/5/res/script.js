var animais = ["gato","onca","koala","macaco","urso","panda", "vazio"];
var posicoes = ["vazio"];
const vazio = "vazio";
var somClick = new Audio('res/click.mp3');
$( document ).ready(function() {
  explicarJogo();
  sortBubbles();
  colocarAnimalParaLancamento();
  $("#jogo").click(function(event){
    if($("#jogar")[0] != undefined) return;
    var animalEmbaixo = $(".image")[0].classList[2];
    alocaAnimal(animalEmbaixo,event.offsetX,event.offsetY);
  })
  $("#jogar").click(function(event){
    $("#jogar").remove();
    $('canvas').clearCanvas();
    $("div#fundo").css("background-color","");
  });
});
function explicarJogo(){
  $("div#fundo").css("background-color","rgba(255,245,195,.7)");
  $('canvas').drawText({
    fillStyle: '#000',
    fontStyle: 'bold',
    fontSize: '20pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: 'COMO JOGAR:\n Os locais vazio estarão disponíveis para que você insira um animal. \nCaso os mesmos forem pares com suas arestas, os animais serão libertados ',
    x: 400, y: 100,
    align: 'center',
    maxWidth: 500,
    lineHeight: 1.3
  });
  $('canvas').drawText({
    fillStyle: '#128764',
    fontStyle: 'bold',
    fontSize: '13pt',
    fontFamily: 'Trebuchet MS, sans-serif',
    text: 'O animal que será colado a tela estará posicionado aqui.',
    x: 400, y: 510,
    align: 'center',
    maxWidth: 500,
    lineHeight: 1.3
  });
  $('canvas').drawArc({
    strokeStyle: '#c33',
    strokeWidth: 4,
    x: 387, y: 618,
    radius: 70,
    start: 270, end: 90,
    closed: true
  });
  // Draw a full circle
$('canvas').drawArc({
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 390, y: 310,
  radius: 50
});
$('canvas').drawText({
  fillStyle: '#128764',
  fontStyle: 'bold',
  fontSize: '13pt',
  fontFamily: 'Trebuchet MS, sans-serif',
  text: 'Posições vazias são posições como essa',
  x: 400, y: 240,
  align: 'center',
  maxWidth: 500,
  lineHeight: 1.3
});
$('canvas').drawText({
  fillStyle: '#128764',
  fontStyle: 'bold',
  fontSize: '43pt',
  fontFamily: 'Trebuchet MS, sans-serif',
  text: 'JOGAR',
  x: 380, y: 440,
  align: 'center',
  maxWidth: 500,
  lineHeight: 1.3
});
}

function sortBubbles(){
  var cont = 0;
  console.log('Sorteando Animais!');
  for(var i = 0; i< 88; i++){
    var randomico = Math.floor(Math.random()*animais.length);
    posicoes[i] = animais[randomico];
  }
  posicoes[49] = "vazio";
  for (i = 0; i < 8; i++){
    for (var j = 0; j< 11; j++){
      var jogo = $("#jogo");
      jogo.append('<div class="image '+ posicoes[cont++] + ' p'+ cont +'" style=" margin-top:'+ 70 * i  +'px ; margin-left:'+ 70 * j +'px" ></div>');
    }
  }
}
function colocarAnimalParaLancamento(){
  /*LIMPO O ATUAL*/
  $("#areaLancamento").children()[0].classList.replace($("#areaLancamento").children()[0].classList[2],"vazio")
  if (verificarSeAindaExisteAEspecieParaSerLibertada() == false) return;
  var randomico = Math.floor(Math.random()*(animais.length-1));

  console.log("randomico para lançamento = " + animais[randomico]);
  $("#areaLancamento").children()[0].classList.replace($("#areaLancamento").children()[0].classList[2],animais[randomico]);
}

function verificarColisao(posicao, elemento=null){
  if (elemento ==null)
    elemento = $("#jogo .p"+ posicao)[0].classList[1];
  verificaAcima(posicao,elemento);
  verificaDireita(posicao,elemento);
  verificaEsquerda(posicao, elemento);
  verificaAbaixo(posicao, elemento);
}
function verificaAcima(posicao,elemento){
  //caso sejam os primeiros não é necessário verificar se existe algo em cima
  console.log("verificaAcima ("+posicao+")");
  if (posicao - 11 < 1) return;
  var acima = $("#jogo .p"+(posicao-11))[0].classList[1];
  if (acima == "vazio") return;
  if(acima != null){
    if (elemento == acima){
      //oculto o elemento e o de cima
      $(".p"+posicao)[0].classList.replace(elemento,"vazio");
      $(".p"+(posicao-11))[0].classList.replace(elemento,"vazio");
      verificarColisao(posicao-11, elemento);
    }
  }
}
function verificaDireita(posicao,elemento){
  console.log("verificaDireita ("+posicao+")");
  //caso sejam os ultimos da lista, não é necessário verificar a direita
  if (posicao % 11 == 0) return;
  var direita = $("#jogo .p"+(posicao+1))[0].classList[1];
  if (direita == "vazio") return;
  if(direita != null){
    if (elemento == direita){
      //oculto ele e o da direita
      $(".p"+posicao)[0].classList.replace(elemento,"vazio");
      $(".p"+(posicao+1))[0].classList.replace(elemento,"vazio");
      verificarColisao(posicao+1, elemento);
    }
  }
}
function verificaEsquerda(posicao,elemento){
  console.log("verificaEsquerda ("+posicao+")");
  //caso sejam os ultimos da lista, não é necessário verificar a direita
  if ((posicao-1) % 11 == 0) return;
  var esquerda = $("#jogo .p"+(posicao-1))[0].classList[1];
  if (esquerda == "vazio") return;
  if(esquerda != null){
    if (elemento == esquerda){
      //oculto ele e o da esquerda
      $(".p"+posicao)[0].classList.replace(elemento,"vazio");
      $(".p"+(posicao-1))[0].classList.replace(elemento,"vazio");
      verificarColisao(posicao-1, elemento);
    }
  }
}
function verificaAbaixo(posicao,elemento){
  console.log("verificaEsquerda ("+posicao+")");
  //para baixo vou ter que verificar se existe a tag
  if($("#jogo .p"+(posicao+11))[0] == undefined) return;
  var abaixo = $("#jogo .p"+(posicao+11))[0].classList[1];
  if (abaixo == "vazio" || abaixo == null) return;
  if (elemento == abaixo){
    //oculto ele e o de baixo
    $(".p"+posicao)[0].classList.replace(elemento,"vazio");
    $(".p"+(posicao+11))[0].classList.replace(elemento,"vazio");
    verificarColisao(posicao+11, elemento);
  }
}

function recuperaIndice(x,y){
  indice = 0;
  //EIXO X 
  for(var i = 1; i<11; i++){
    if (x >= 0 && x <= 70){
      indice = 1;
      break;
    }
    if(x > i * 70 && x <= (i +1) * 70){
      indice = i+1;
      break;
    }
  }
  // EIXO Y
  for(var i = 1; i<10; i++){
    if (y >= 0 && y <= 70){
      break;
    }
    if(y > i * 70 && y <= (i +1) * 70){
      indice = (i* 11) + indice;
      break;
    }
  }
  return indice;
}

function alocaAnimal(animal, x,y){
  var indice = recuperaIndice(x,y);
  if ($("#jogo .p"+indice)[0] == undefined) return;
  var animalPosicao = $("#jogo .p"+indice)[0].classList[1];
  if (animalPosicao == vazio){
    tocaraudio(somClick);
    $("#jogo .p"+indice)[0].classList.replace("vazio",animal);
    var interval = setInterval(() => {
      verificarColisao(indice);
      colocarAnimalParaLancamento();
      clearInterval(interval);
    }, 500);
    
  }
}
function teste(animal){
  for (var i = 1; i <=posicoes.length; i++){
    $("#jogo .p"+i)[0].classList.replace(animal,vazio);
  }
  $("#jogo .p49")[0].classList.replace($("#jogo .p49")[0].classList[1],animal);
}
function verificarSeAindaExisteAEspecieParaSerLibertada(){
  for (var i = 0; i< animais.length; i++){
    if($("#jogo ."+animais[i])[0] == undefined){
      console.log(animais);
      animais.splice(i,1)
    }
  }
  if (animais.length == 0){
    return false;
  }
}
function tocaraudio(som){
  som.addEventListener('ended', function (){
    this.currentTime = 0;
		this.play();
	}, false);

  som.play().catch(function() {});	

  var interval = setInterval(() => {
    som.pause();
    
    clearInterval(interval);
  }, 2000);
}