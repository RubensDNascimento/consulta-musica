$(document).ready(function() {
    $("#btnBuscar").click(function() {
        limparResultados();
        var artist = $("#txtBanda").val();
        var song = $("#txtMusica").val();
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
                                } else {
                                    $('#imgBanda').attr('src', "../images/103-fundo-claro-transparente.png");
                                    document.getElementById('erroImagem').innerHTML = "Imagem não encontrada!";
                                }
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
                                    $('#txtAlbum').val(data.mus[0].alb.name);
                                    $('#txtAlbumAno').val(data.mus[0].alb.year);
                                } else {
                                    document.getElementById('erroAlbum').innerHTML = "Album não encontrado!";
                                }
                            },
                            error: function(erro) {
                                console.log(erro);
                            },
                        });

                        // Mostrar botão de Tradução e Original
                        if (data.mus[0].translate) {
                            $('#divLetra ').prepend('<input type=button value="Tradução &raquo;" onClick="$(document).trigger(\'translate\')"><br/>');
                            $(document).one('translate', function() {
                                //$('#divLetra .text').text(data.mus[0].translate[0].text);
                                $("#txtLetra").val(data.mus[0].translate[0].text);

                                $('#divLetra ').prepend('<input type=button value="&laquo; Original" onClick="$(document).trigger(\'original\')"><br/>');
                                $(document).one('original', function() {
                                    //showLetra(data,art,mus,0);
                                    letra = data.mus[0].text;
                                    $("#txtLetra").val(letra);
                                    $(document).trigger()
                                });
                            });
                        }


                        letra = data.mus[0].text;
                        $("#txtLetra").val(letra);

                        if (data.type == 'aprox') {
                            $('#txtLetra').val('Você quis dizer: ' + data.mus[0].name + "?");
                        }


                    } else if (data.type == 'song_notfound') {
                        $("#txtLetra").val(
                            "Musica " + song + " não encontrada!"
                        )
                    } else {

                        $("#txtLetra").val(
                            "Banda ou Artista " + artist + " não econtrado(a)!"
                        )
                    }


                },
                error: function(erro) {
                    console.log(erro);
                },
            });

        }
    });

    $("#btnLimpar").click(function() {
        limparTudo();
    });
});