<?php

function compressao_padrao_jpg($imagem,$qualidade) {
    $imagem = imagecreatefromjpeg($imagem);
    $destino = 'destino.jpg';
    imagejpeg($imagem, $destino, $qualidade);
    return $destino;
}

function compressao_padrao_png($imagem,$qualidade) {
    $imagem = imagecreatefrompng($imagem);
    $destino = 'destino.png';
    imagepng($imagem, $destino ,$qualidade);
    return $destino;
}

function compressao_personalizada_png($imagem, $tamanho_desejado){
    $destino = 'destino.jpg';
    $qualidade = 9; // inicia o código com a qualidade no máximo
    
    $imagem = imagecreatefrompng($imagem);
    
    do {    
        ob_start();
        imagejpeg($imagem, null, $qualidade); 

        $tamanho_atual = strlen(ob_get_contents());
        ob_end_clean();

        if($tamanho_atual > $tamanho_desejado) {
            $qualidade--;
        }

    } while ($tamanho_atual > $tamanho_desejado && $qualidade > 0);

    imagepng($imagem, $destino ,$qualidade);
    imagedestroy($imagem);
    return $destino;    
}

function compressao_personalizada_jpg($imagem,$tamanho_desejado){
    $destino = 'destino.jpg';
    $qualidade = 90; // inicia o código com a qualidade no máximo

    $imagem = imagecreatefromjpeg($imagem);

    do {
        ob_start();
        imagejpeg($imagem, null, $qualidade); 

        $tamanho_atual = strlen(ob_get_contents());
        ob_end_clean();

        if($tamanho_atual > $tamanho_desejado) {
            $qualidade -= 5;
        }

    } while ($tamanho_atual > $tamanho_desejado && $qualidade > 0);

    imagejpeg($imagem, $destino ,$qualidade);
    imagedestroy($imagem);
    return $destino;
}

?>
