function validar(artist, song) {
    var artist = document.getElementById('txtBanda').value;
    var song = document.getElementById('txtMusica').value;

    if (artist == "" || artist.length <= 1) {
        document.getElementById('erroBanda').innerHTML = " Banda ou Artista invalido!";
        //alert("Banda ou Artista invalido!");
        document.getElementById('txtBanda').focus();
        return false;
    } else {
        document.getElementById('erroBanda').innerHTML = "";
    }
    if (song == "" || song.length < 3) {
        document.getElementById('erroMusica').innerHTML = "Musica invalida!";
        //alert("Musica invalida!");
        document.getElementById('txtMusica').focus();
        return false;
    } else {
        document.getElementById('erroMusica').innerHTML = "";
    }
    return true;
}