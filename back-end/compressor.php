<?php

include 'diminuicao_qualidade.php';
include 'salvando_imagem.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['salvar'])) {

        // Recupera os valores do formulário
        $imagem = $_POST['imagem'];
        $qualidade = $_POST['qualidade'];
        $valorPersonalizado = $_POST['input_tamanho'];
        $tipoTamanho = $_POST['qualidade_personalizada'];

        $informacoes_imagem = getimagesize($imagem);

        switch ($qualidade) {
            case 1:
                if($informacoes_imagem[2] == IMAGETYPE_PNG) {
                    $imagem = compressao_padrao_png($imagem, 7);
                } else if ($informacoes_imagem[2] == IMAGETYPE_JPEG) {
                    $imagem = compressao_padrao_jpg($imagem, 80);
                }
                break;
            case 2:
                if($informacoes_imagem[2] == IMAGETYPE_PNG) {
                    $imagem = compressao_padrao_png($imagem, 6);
                } else if ($informacoes_imagem[2] == IMAGETYPE_JPEG) {
                    $imagem = compressao_padrao_jpg($imagem, 65);
                }
                break;
            case 3:
                if($informacoes_imagem[2] == IMAGETYPE_PNG) {
                    $imagem = compressao_padrao_png($imagem, 3);
                } else if ($informacoes_imagem[2] == IMAGETYPE_JPEG) {
                    $imagem = compressao_padrao_jpg($imagem, 50);
                }
                break;
            case 4:
                if($tipoTamanho == 1){
                    $valorPersonalizado = ($valorPersonalizado * 1024 * 1024);
                    
                    if($informacoes_imagem[2] == IMAGETYPE_PNG) {
                        $imagem = compressao_personalizada_png($imagem, $valorPersonalizado);
                    } else if ($informacoes_imagem[2] == IMAGETYPE_JPEG) {
                        $imagem = compressao_personalizada_jpg($imagem, $valorPersonalizado);
                    }

                } else if ($tipoTamanho == 2) {
                    $valorPersonalizado = ($valorPersonalizado * 1024 );
                    
                    if($informacoes_imagem[2] == IMAGETYPE_PNG) {
                        $imagem = compressao_personalizada_png($imagem, $valorPersonalizado);
                    } else if ($informacoes_imagem[2] == IMAGETYPE_JPEG) {
                        $imagem = compressao_personalizada_jpg($imagem, $valorPersonalizado);
                    }
                }
                break;
            default:
                null;
                break;
        }

        salvar_imagem($imagem);

    }
}
