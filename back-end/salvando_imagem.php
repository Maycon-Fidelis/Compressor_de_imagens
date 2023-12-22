<?php

function salvar_imagem($imagem) {

    $informacoes_imagem = getimagesize($imagem);
    
    switch ($informacoes_imagem[2]) {
        case IMAGETYPE_PNG:
            header('Content-Description: File Transfer');
            header('Content-Type: image/png');
            header('Content-Disposition: attachment; filename="imagem_processada.' . pathinfo($imagem, PATHINFO_EXTENSION) . '"');
            header('Expires: 0');
            header('Pragma: public');
            
            readfile($imagem);
            
            unlink($imagem);
        
            exit;
        
        case IMAGETYPE_JPEG:
            header('Content-Description: File Transfer');
            header('Content-Type: image/jpeg');
            header('Content-Disposition: attachment; filename="imagem_processada.' . pathinfo($imagem, PATHINFO_EXTENSION) . '"');
            header('Expires: 0');
            header('Pragma: public');
            
            readfile($imagem);
            
            unlink($imagem);
            
            exit;
        
    }
}

?>
