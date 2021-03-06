$(document).ready(function() {
    var aux = 0;
    $("#btnBuscar").click(function() {

        limparResultados();
        var artist = $("#txtBanda").val();
        var song = $("#txtMusica").val();

        mostrarResultado(artist, song);

    });

    $("#btnLimpar").click(function() {
        limparTudo();
    });

    $("#btnVoltar").click(function() {
        limparTudo();
        document.getElementById("inputDados").style.display = "inline";
        document.getElementById("btnVoltar").style.display = "none";
    });

    function mostrarResultado(artist, song) {

        var letra;

        if (validar(artist, song) == true) {

            var urlLet = "https://api.vagalume.com.br/search.php" +
                "?art=" + artist +
                "&mus=" + song +
                "&apikey={key}";

            var urlImg = "https://api.vagalume.com.br/search.php?art=" + artist + "&extra=artpic&nolyrics=1&apikey={key}";
            var urlAlb = "https://api.vagalume.com.br/search.php?art=" + artist + "&mus=" + song + "&extra=alb&nolyrics=1&apikey={key}"


            $.ajax({
                url: urlLet,
                type: "get",
                dataType: "json",
                success: function(data) {

                    if (data.type == 'exact' || data.type == 'aprox') {

                        document.getElementById("inputDados").style.display = "none";
                        document.getElementById("btnVoltar").style.display = "inline";
                        console.log(urlLet);
                        console.log(urlImg);
                        console.log(urlAlb);
                        var traducao = pegarTraducao(data, artist, song);

                        //Buscar e mostrar imagem da banda
                        $.ajax({
                            url: urlImg,
                            type: "get",
                            dataType: "json",
                            success: function(data) {
                                if (data.art != null) {
                                    $('#txtTituloImagem').text(data.art.name);

                                    $('#imgBanda').attr('src', data.art.pic_medium);
                                    $('#linkBanda').attr('href', data.art.url);
                                }
                            },
                            error: function(erro) {
                                console.log(erro);
                            },
                        });


                        //$('#divLetra .text').text(data.mus[0].text);




                        //letra = data.mus[0].text;
                        //$("#txtLetra").val(letra);
                        if (data.type == 'aprox') {
                            $('#txtLetra').text('Voc?? quis dizer: ' + data.mus[0].name + "?");
                            //Botao SIM
                            $('#divLetra').append('<input type=button  id="btnSim"  value="Sim" onClick="$(document).trigger(\'botaoSim\')">');
                            $(document).one('botaoSim', function() {
                                song = data.mus[0].name;
                                $('#btnSim').remove();
                                $('#btnNao').remove();

                                mostrarResultado(artist, song);
                            });

                            //Botao N??O
                            $('#divLetra').append('<input type=button  id="btnNao"  value="N??o" onClick="$(document).trigger(\'botaoNao\')">');
                            $(document).one('botaoNao', function() {
                                artist = "";
                                song = "";
                                limparTudo();
                                document.getElementById("inputDados").style.display = "inline";
                                document.getElementById("btnVoltar").style.display = "none";
                            });
                        } else {

                            document.getElementById("inputDados").style.display = "none";
                            //Buscar e mostrar nome e ano do album
                            $.ajax({
                                url: urlAlb,
                                type: "get",
                                dataType: "json",
                                success: function(data) {
                                    if (data.mus[0].alb != null) {
                                        $('#txtTituloAlbum').text("Album:");

                                        $('#txtAlbum').text(data.mus[0].alb.name);
                                        $('#linkAlbum').attr('href', data.mus[0].alb.url);

                                        $('#txtTituloAlbumAno').text("Ano:");
                                        $('#txtAlbumAno').text(data.mus[0].alb.year);
                                    }
                                },
                                error: function(erro) {
                                    console.log(erro);
                                },
                            });


                            // Mostrar bot??es de Tradu????o e Original
                            //var traducao = pegarTraducao(data, artist, song);
                            if (traducao) {
                                $('#divLetra').prepend('<input type=button  id="btnTraducao"  value="Tradu????o &raquo;" onClick="$(document).trigger(\'translate\')">');
                                //$('#divLetra').prepend('<input type=button  id="btnOriginal"  value="&laquo; Original" onClick="$(document).trigger(\'original\')" >');


                                //Mostrar Tradu????o
                                $(document).on('translate', function() {
                                    imprimir(traducao);
                                    $('#divLetra').prepend('<input type=button  id="btnOriginal"  value="&laquo; Original" onClick="$(document).trigger(\'original\')" >');
                                    $('#btnTraducao').remove();
                                });

                                //Mostrar Letra Original
                                $(document).on('original', function() {
                                    imprimir(data.mus[0].text);
                                    $('#btnOriginal').remove();
                                    $('#divLetra').prepend('<input type=button  id="btnTraducao"  value="Tradu????o &raquo;" onClick="$(document).trigger(\'translate\')">');
                                });
                            }
                            /*
                            if (data.mus[0].translate && aux == 0) {

                                $('#divLetra').prepend('<input type=button  id="btnTraducao"  value="Tradu????o &raquo;" onClick="$(document).trigger(\'translate\')">');
                                //$('#divLetra').prepend('<input type=button  id="btnOriginal"  value="&laquo; Original" onClick="$(document).trigger(\'original\')" >');


                                //Mostrar Tradu????o
                                $(document).on('translate', function() {
                                    imprimirTraducao(data, artist, song);
                                    $('#divLetra').prepend('<input type=button  id="btnOriginal"  value="&laquo; Original" onClick="$(document).trigger(\'original\')" >');
                                    $('#btnTraducao').remove();
                                });

                                //Mostrar Letra Original
                                $(document).on('original', function() {
                                    imprimirOriginal(data, artist, song);
                                    $('#btnOriginal').remove();
                                    $('#divLetra').prepend('<input type=button  id="btnTraducao"  value="Tradu????o &raquo;" onClick="$(document).trigger(\'translate\')">');
                                });
                            }*/

                            //Mostar letra orginal
                            $('#txtTituloLetra').text(data.mus[0].name);
                            $('#linkMusica').attr('href', data.mus[0].url);
                            imprimir(data.mus[0].text);
                            //imprimirOriginal(data, artist, song);
                        }


                    } else if (data.type == 'song_notfound') {
                        /*$("#txtLetra").text(
                            "Musica " + song + " n??o encontrada!"
                        )*/
                        //alert("Musica " + song + " n??o encontrada!");

                        document.getElementById('erroMusica').innerHTML = "Musica " + song + " n??o encontrada!";
                        document.getElementById('txtMusica').focus();

                    } else {

                        /*$("#txtLetra").text(
                            "Banda ou Artista " + artist + " n??o econtrado(a)!"
                        )*/
                        //alert("Banda ou Artista " + artist + " n??o econtrado(a)!");
                        document.getElementById('erroBanda').innerHTML = "Banda " + artist + " n??o encontrada!";
                        document.getElementById('txtBanda').focus();
                    }


                },
                error: function(erro) {
                    console.log(erro);
                },
            });
        };
    };

    //Impress??es da Letra
    function imprimir(letra) {
        $('#txtLetra').text(letra);
    }
    /*function imprimirTraducao(data, artist, song) {
        $('#txtLetra').text(data.mus[0].translate[0].text);
    }

    function imprimirOriginal(data, artist, song) {
        $('#txtLetra').text(data.mus[0].text);


    }*/

    function pegarTraducao(data, artist, song) {
        if (data.mus[0].translate) {

            return data.mus[0].translate[0].text
        } else {
            return null
        }
    }


});