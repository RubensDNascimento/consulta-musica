function limparResultados() {
    document.getElementById('txtAlbum').value = "";
    document.getElementById('erroAlbum').innerHTML = "";
    document.getElementById('txtAlbumAno').value = "";
    document.getElementById('imgBanda').setAttribute('src', "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
    document.getElementById('erroImagem').innerHTML = "";
    document.getElementById('txtLetra').value = "";

}

function limparTudo() {
    limparResultados();
    document.getElementById('txtBanda').value = "";
    document.getElementById('txtMusica').value = "";
}