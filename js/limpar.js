function limparResultados() {
    $('#txtAlbum').text("");
    $('#txtAlbumAno').text("");
    $('#txtLetra').text("");

    $('#imgBanda').attr('src', "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");

    $('#erroAlbum').text("");
    $('#erroImagem').text("");
    $('#erroBanda').text("");
    $('#erroMusica').text("");

    $('#txtTituloImagem').text("");
    $('#txtTituloAlbum').text("");
    $('#txtTituloAlbumAno').text("");
    $('#txtTituloLetra').text("");


    $('#linkBanda').attr('src', "");
    $('#linkAlbum').attr('src', "");
    $('#linkMusica').attr('src', "");

    if ($('#btnOriginal')) {
        $('#btnOriginal').remove();
        $('#btnTraducao').remove();
    }

    if ($('#btnSim')) {
        $('#btnSim').remove();
        $('#btnNao').remove();
    }

    //document.getElementById('txtLetra').value = "";


}

function limparTudo() {
    limparResultados();
    $('#txtBanda').val("");
    $('#txtMusica').val("");
}