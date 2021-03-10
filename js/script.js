$(document).ready(function() {
    $("#btnBuscar").click(function() {

        limparResultados();
        var artist = $("#txtBanda").val();
        var song = $("#txtMusica").val();
        mostrarResultado(artist, song);

    });

    $("#btnLimpar").click(function() {
        limparTudo();
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

                        console.log(urlLet);
                        console.log(urlImg);
                        console.log(urlAlb);
                        $.ajax({
                            url: urlImg,
                            type: "get",
                            dataType: "json",
                            success: function(data) {
                                if (data.art != null) {
                                    $('#imgBanda').attr('src', data.art.pic_medium);
                                    $('#linkBanda').attr('href', data.art.url);
                                    $('#txtTituloImagem').text("Imagem:");
                                }
                                /*else {
                                                                   $('#imgBanda').attr('src', "../images/103-fundo-claro-transparente.png");
                                                                   document.getElementById('erroImagem').innerHTML = "Imagem não encontrada!";
                                                               }*/
                            },
                            error: function(erro) {
                                console.log(erro);
                            },
                        });
                        $.ajax({
                            url: urlAlb,
                            type: "get",
                            dataType: "json",
                            success: function(data) {
                                if (data.mus[0].alb != null) {
                                    $('#txtTituloAlbum').text("Album:");
                                    $('#txtAlbum').text(data.mus[0].alb.name);

                                    $('#imgAlbum').attr('src', data.mus[0].alb.img)
                                    $('#linkAlbum').attr('href', data.mus[0].alb.url);

                                    $('#txtTituloAlbumAno').text("Ano:");
                                    $('#txtAlbumAno').text(data.mus[0].alb.year);
                                }
                                /*else {
                                                                   document.getElementById('erroAlbum').innerHTML = "Album não encontrado!";
                                                               }*/
                            },
                            error: function(erro) {
                                console.log(erro);
                            },
                        });

                        //$('#divLetra .text').text(data.mus[0].text);
                        $('#txtTituloLetra').text(data.mus[0].name);
                        $('#linkMusica').attr('href', data.mus[0].url);

                        imprimirOriginal(data, artist, song);

                        // Mostrar botão de Tradução e Original
                        if (data.mus[0].translate) {
                            $('#divLetra').prepend('<input type=button  id="btnTraducao"  value="Tradução &raquo;" onClick="$(document).trigger(\'translate\')">');
                            $('#divLetra').prepend('<input type=button  id="btnOriginal"  value="&laquo; Original" onClick="$(document).trigger(\'original\')">');

                            $(document).on('translate', function() {
                                imprimirTraducao(data, artist, song);
                            });

                            $(document).on('original', function() {
                                imprimirOriginal(data, artist, song);
                            });
                        }


                        //letra = data.mus[0].text;
                        //$("#txtLetra").val(letra);

                        if (data.type == 'aprox') {
                            $('#txtLetra').text('Você quis dizer: ' + data.mus[0].name + "?");
                        }


                    } else if (data.type == 'song_notfound') {
                        $("#txtLetra").text(
                            "Musica " + song + " não encontrada!"
                        )
                    } else {

                        $("#txtLetra").text(
                            "Banda ou Artista " + artist + " não econtrado(a)!"
                        )
                    }


                },
                error: function(erro) {
                    console.log(erro);
                },
            });
        };
    };

    //Impressões da Letra
    function imprimirTraducao(data, artist, song) {
        $('#txtLetra').text(data.mus[0].translate[0].text);
    }

    function imprimirOriginal(data, artist, song) {
        $('#txtLetra').text(data.mus[0].text);
    }


});