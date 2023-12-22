// Função de arrastar a imagem
var upload_imagem = document.getElementById('upload_imagem');
upload_imagem.addEventListener('dragover', function (e) {
    e.preventDefault();
    upload_imagem.classList.add('dragged-over');
})

// Função quando tira a imagem
upload_imagem.addEventListener('dragleave', function () {
    upload_imagem.classList.remove('dragged-over');
})

// Salvando a imagem quando arrasta
upload_imagem.addEventListener('drop', function (e) {
    e.preventDefault();
    upload_imagem.files = e.dataTransfer.files;
    upload_imagem.classList.remove('dragged-over');
    Salvar_imagem(e.dataTransfer.files);
});

// Salvando a imagem pelo botão
var upload = document.getElementById('upload');
upload.addEventListener('change', function () {
    Salvar_imagem(upload.files);
})

// Salvar imagem
var img_edicao = document.getElementById('img_edicao');
var nome_do_arquivo = document.getElementById('nome_do_arquivo');
var tamanho_do_arquivo = document.getElementById('tamanho_do_arquivo');
let tamanho_arquivo;
let tamanho_do_arquivo_em_kb;
let tamanho_do_arquivo_em_mb;
let tamanho_do_arquivo_em_kb_formatado;
let tamanho_do_arquivo_em_mb_formatado;
var imagem_input = document.getElementById('imagem_input');

function Salvar_imagem(arquivo) {
    var extensoes_suportadas = ['jpg', 'jpeg', 'png'];

    // Verifica se algum arquivo foi selecionado
    if (arquivo.length > 0) {
        var imagem = arquivo[0];

        var nome_arquivo = imagem.name;
        nome_do_arquivo.textContent = nome_arquivo;

        tamanho_arquivo = imagem.size;

        var extensao_arquivo = nome_arquivo.toLowerCase().split('.').pop();

        if (!extensoes_suportadas.includes(extensao_arquivo)) {
            alert("Formato de arquivo não suportado. Tente um arquivo tipo JPG, JPEG ou PNG.");
        } else {
            var reader = new FileReader();
            
            reader.onload = function (event) {
                img_edicao.src = event.target.result;
                imagem_input.value = event.target.result;
            }

            reader.readAsDataURL(imagem);

            ExibirTelaEdicao();
            history.pushState({ telaEdicao: true }, 'Edição', '');
        }
    }
}


// Função para exibir tela de upload
var tela_de_upload = document.getElementById('tela_de_upload');
var tela_edicao = document.getElementById('tela_edicao');
function ExibirTelaUpload() {
    tela_edicao.style.display = 'none';
    tela_de_upload.style.display = 'block';
}

// Função para exibir tela de edição
function ExibirTelaEdicao() {
    tela_edicao.style.display = 'block';
    tela_de_upload.style.display = 'none';
}

// Evento quando clicar no botão voltar do navegador
window.addEventListener('popstate', function (event) {
    if (history.state && history.state.tela_de_upload) {
        ExibirTelaEdicao();
    } else {
        ExibirTelaUpload();
    }
})


var input_tamanho = document.getElementById('input_tamanho');
var qualidade_imagem = document.getElementById('qualidade_imagem');
var tela_edicao_tamanho = document.getElementById('tela_edicao_tamanho');
qualidade_imagem.value = 1;
var valor_personalizado = document.getElementById('valor_personalizado');
if (qualidade_imagem.value == 4) {
    valor_personalizado.style.display = 'flex';
    Tamanho_correto_arquivo();
}
qualidade_imagem.addEventListener('change', function () {
    if (qualidade_imagem.value == 4) {
        valor_personalizado.style.display = 'flex';
        tela_edicao_tamanho.style.height = '520px';
        tela_edicao_tamanho.style.width = '700px';
        Tamanho_correto_arquivo();
    } else {
        valor_personalizado.style.display = 'none';
        tela_edicao_tamanho.style.height = '420px';
        tela_edicao_tamanho.style.width = '600px';
    }
})

// Função para o valor do arquivo não ser maior que o original
function Tamanho_correto_arquivo() {
    const tipo_de_tamanho = document.getElementById('tipo_de_tamanho');

    tamanho_do_arquivo_em_kb = tamanho_arquivo / 1024;
    tamanho_do_arquivo_em_kb_formatado = tamanho_do_arquivo_em_kb.toFixed(2);
    tamanho_do_arquivo_em_mb = tamanho_do_arquivo_em_kb / 1024;
    tamanho_do_arquivo_em_mb_formatado = tamanho_do_arquivo_em_mb.toFixed(2);

    if (tipo_de_tamanho.value == 1) {
        input_tamanho.value = tamanho_do_arquivo_em_mb_formatado;
    } else if (tipo_de_tamanho.value == 2) {
        input_tamanho.value = tamanho_do_arquivo_em_kb_formatado;
    }


    tipo_de_tamanho.addEventListener('change', function () {
        if (tipo_de_tamanho.value == 1) {
            input_tamanho.value = tamanho_do_arquivo_em_mb_formatado;
        } else if (tipo_de_tamanho.value == 2) {
            input_tamanho.value = tamanho_do_arquivo_em_kb_formatado;
        }
    })

    input_tamanho.addEventListener('change', function () {
        if (tipo_de_tamanho.value == 1) {
            if (input_tamanho.value >= parseFloat(tamanho_do_arquivo_em_mb_formatado)) {
                alert('Não tem como comprimir um arquivo com um tamanho maior que o arquivo original');
                input_tamanho.value = tamanho_do_arquivo_em_mb_formatado;
            } else if (input_tamanho.value <= 0) {
                alert('Não tem como comprimir um arquivo com um tamanho menor que 0');
                input_tamanho.value = tamanho_do_arquivo_em_mb_formatado;
            }
        } else if (tipo_de_tamanho.value == 2) {
            if (input_tamanho.value >= parseFloat(tamanho_do_arquivo_em_kb_formatado)) {
                alert('Não tem como comprimir um arquivo com um tamanho maior que o arquivo original');
                input_tamanho.value = tamanho_do_arquivo_em_kb_formatado;
            } else if (input_tamanho.value <= 0) {
                alert('Não tem como comprimir um arquivo com um tamanho menor que 0');
                input_tamanho.value = tamanho_do_arquivo_em_kb_formatado;
            }
        }
    })

// Função para evitar que seja feito o submit com valores incompativeis
var form_compressao = document.getElementById('form_compressao');
var bloquearEnvio = false; 

form_compressao.addEventListener('submit', function (event) {

    if (tipo_de_tamanho.value == 1) {
        if (input_tamanho.value >= parseFloat(tamanho_do_arquivo_em_mb_formatado)) {
            alert('Não tem como comprimir um arquivo com um tamanho maior que o arquivo original');
            input_tamanho.value = tamanho_do_arquivo_em_mb_formatado;
            bloquearEnvio = true;
            event.preventDefault();
            return;
        } else if (input_tamanho.value <= 0) {
            alert('Não tem como comprimir um arquivo com um tamanho menor que 0');
            input_tamanho.value = tamanho_do_arquivo_em_mb_formatado;
            bloquearEnvio = true;
            event.preventDefault();
            return;
        }
    } else if (tipo_de_tamanho.value == 2) {
        if (input_tamanho.value >= parseFloat(tamanho_do_arquivo_em_mb_formatado)) {
            alert('Não tem como comprimir um arquivo com um tamanho maior que o arquivo original');
            input_tamanho.value = tamanho_do_arquivo_em_kb;
            bloquearEnvio = true;
            event.preventDefault();
            return;
        } else if (input_tamanho.value <= 0) {
            alert('Não tem como comprimir um arquivo com um tamanho menor que 0');
            input_tamanho.value = tamanho_do_arquivo_em_kb;
            bloquearEnvio = true;
            event.preventDefault();
            return;
        }
    }
    
});

}
