$(document).ready(function() {
    $("#btnBuscar").click(function() {
        var artist = $("#txtBanda").val();
        var song = $("#txtMusica").val();
        var letra;
        if (validar(artist, song) == true) {

            var urlStr = "https://api.vagalume.com.br/search.php" +
                "?art=" + artist +
                "&mus=" + song +
                "&apikey={key}";

            var urlImg = "https://api.vagalume.com.br/search.php?art=" + artist + "&extra=artpic&nolyrics=1&apikey={key}";
            var urlAlb = "https://api.vagalume.com.br/search.php?art=" + artist + "&mus=" + song + "&extra=alb&nolyrics=1&apikey={key}"


            $.ajax({
                url: urlStr,
                type: "get",
                dataType: "json",
                success: function(data) {

                    if (data.type == 'exact' || data.type == 'aprox') {

                        $.ajax({
                            url: urlImg,
                            type: "get",
                            dataType: "json",
                            success: function(data) {
                                $('#imgBanda').attr('src', data.art.pic_medium);
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
                                $('#txtAlbum').val(data.mus[0].alb.name);
                            },
                            error: function(erro) {
                                console.log(erro);
                            },
                        });


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
    })
});