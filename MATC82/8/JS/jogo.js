var altura = 480;
var largura = 640;
var pontos = 0;
var aceleracao = 3000;

// Criando objeto para audio da familia addams
var audioAddams = new Audio('AUDIO/music.mp3');

// Criando objeto para audio de clique na imagem certa
var audioCerto = new Audio('AUDIO/acertou.mp3');

// Criando objeto para audio de clique na imagem errada
var audioErrado = new Audio('AUDIO/errou.mp3');

// Função para executar a função de mostrar a imagem
// Esse função foi criada para permitir que o tempo de renderização das imagens fosse acelerado
function timeout(){
    setTimeout(renderScene, aceleracao);

    if(audioAddams.paused) {
        // Tocando musica da familia addams caso o audio tenha parado
        audioAddams.play().catch(function() {});
    } 

}

// Função que será executada quando a página for carregada 
$(document).ready(function () {

    // Tocando musica da familia addams
    audioAddams.play().catch(function() {});

    // Tornando pontos -10 e +10 invisiveis
    $('#mais-pontos').hide();
    $('#menos-pontos').hide();

    // Manipulação da seção de pontos
    $('#contagem-pontos').html(pontos);

    // Chamando função para renderizar as imagens
    timeout();
    
    // Criando gradiente de cor
    var linear = $('canvas').createGradient({
        x1: 0, y1: 20,
        x2: 0, y2: 80,
        c1: '#9370DB',
        c2: '#A020F0',
        c3: '#9400D3'
    });

    // Desenhando plano de fundo
    $("canvas").drawRect({
        layer:true,
		fillStyle: linear, // Cor do fundo
		x: 320,
		y: 240,
		width: largura,
        height: altura,
        cornerRadius: 10, // Raio da borda
        strokeStyle: '#BEBEBE', // Cor da borda
        strokeWidth: 10, // Largura da borda
	});

});


// Função para mostrar as imagens que a mão terá que pegar

function renderScene() {

    // Limpando o canvas para que as imagens não fiquem sobrepostas
    $("canvas").clearCanvas(); 

    // Criando gradiente de cor
    var linear = $('canvas').createGradient({
        x1: 0, y1: 20,
        x2: 0, y2: 80,
        c1: '#9370DB',
        c2: '#A020F0',
        c3: '#9400D3'
    });

    // Desenhando plano de fundo
    $("canvas").drawRect({
        layer:true,
        fillStyle: linear, // Cor do fundo
        x: 320,
        y: 240,
        width: largura,
        height: altura,
        cornerRadius: 10, // Raio da borda
        strokeStyle: '#BEBEBE', // Cor da borda
        strokeWidth: 10, // Largura da borda
    });

    var posicaoX = Math.floor(Math.random()*largura) - 60; // posição x randomica
    var posicaoY = Math.floor(Math.random()*altura) - 60; // posição y randomica
    
    // Controle para que as imagens não sejam renderizadas fora da tela
    if(posicaoX < 70) {
        posicaoX = 70;
    }

    if(posicaoY < 70) {
        posicaoY = 70;
    }

    // Achando diretório da imagem
    dirImg = Math.floor(Math.random() * 2 + 1);

    // Verificando se a imagem pertence ao grupo
    if (dirImg == 2) {

        // Mostrando a imagem
        $("canvas").drawImage({
            layer:true,
            source: 'IMG/IMG'+ dirImg +'/img' + Math.floor(Math.random() * 4 + 1) + '.png', // Lógica para mostrar diferentes imagens, mostrando 10 imagens ao total
            x: posicaoX,
            y: posicaoY,
            width: 70,
            height: 70,
            click: function(layer) {
                $("canvas").drawRect({
                    layer:true,
                    fillStyle: linear, // Cor do fundo
                    x: 320,
                    y: 240,
                    width: largura,
                    height: altura,
                    cornerRadius: 10, // Raio da borda
                    strokeStyle: '#BEBEBE', // Cor da borda
                    strokeWidth: 10, // Largura da borda
                });

                // Trocando a imagem do ponteiro para a mão fechada
                $('html').css('cursor','url(IMG/mao-fechada.png) 30 30, auto;');

                // Tocando audio de sucesso
                audioCerto.play().catch(function() {});

                // Mostrando somatório de pontos
                $('#mais-pontos').fadeIn('slow');
                $('#mais-pontos').fadeOut('slow');

                // Somando pontos
                pontos+=10;
                $('#contagem-pontos').html(pontos);

                // Aumentando a aceleração
                if (aceleracao > 1000) {
                    aceleracao -= 500;
                }

                // Verificando se a pontuação é maior que 100 para indicar que o jogador ganhou
                if( pontos >= 100){
                    alert("Você ganhou!");
                    window.location.href = 'ganhou.html';
                }

            }
        });

    } else { // Caso a imagem não pertença

        // Mostrando a imagem
        $("canvas").drawImage({
            layer:true,
            source: 'IMG/IMG'+ dirImg +'/img' + Math.floor(Math.random() * 4 + 1) + '.png', // Lógica para mostrar diferentes imagens, mostrando 10 imagens ao total
            x: posicaoX,
            y: posicaoY,
            width: 70,
            height: 70,
            click: function(layer) {
                $("canvas").drawRect({
                    layer:true,
                    fillStyle: linear, // Cor do fundo
                    x: 320,
                    y: 240,
                    width: largura,
                    height: altura,
                    cornerRadius: 10, // Raio da borda
                    strokeStyle: '#BEBEBE', // Cor da borda
                    strokeWidth: 10, // Largura da borda
                });

                // Trocando a imagem do ponteiro para a mão fechada
                $('html').css('cursor','url(IMG/mao-fechada.png) 30 30, auto;');

                // Tocando audio de erro
                audioErrado.play().catch(function() {});

                // Mostrando subtração dos pontos
                $('#menos-pontos').fadeIn('slow');
                $('#menos-pontos').fadeOut('slow');

                // Subtraindo pontos
                pontos-=10;
                $('#contagem-pontos').html(pontos);

                // Se pontuação chegar a zero informa que o jogador perdeu
                if(pontos < 0) {
                    alert("Você perdeu!");
                    window.location.href = 'perdeu.html';
                }
            }
        });

    }

    // Função para rendericar as imagens
    timeout();

}