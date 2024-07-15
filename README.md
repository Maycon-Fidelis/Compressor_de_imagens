# Compressor de Imagem  

# Visão Geral:
Este é um projeto é um compressor de imagem que permite que o usuario reduza imagens PNG ou JPG. A compressão pode ser feita de para alta qualidade, media, baixa ou personalizada, onde o usuário define o tamanho desejado em kilobytes (KB) ou megabytes (MB). O resultado é uma imagem comprimida com o valor desejado ou um valor aproximado. 

# Objetivos:
O princiapl objetivo desse projeto veio da necessidade pessoal de comprimir imagens para facilitar upload em sistemas que impõem limites de tamanho. Essa ferramenta proporciona uma solução prática para esse problema.

# Demonstração:
Nesse exempo foi pego uma imagem de 1,2 Mb e comprimida para ocupar 0.1 Mb
<div align="center">
  <img src="https://github.com/user-attachments/assets/7929e0a0-0e7e-46f6-b05b-5a8439cbd2e2">
</div>

# Tecnologias Utilizadas
- HTML
- CSS
- JavaScript
- Bootstrap
- PHP

# Requisitos
Para executar este projeto, é necessário ter um servidor web com suporte para o PHP. Algumas opções populares são:
- XAMPP
- Outros servidores web compatíveis com PHP

# Executando o projeto:

1. Clone o repositório:
    Observação: Clonar o projeto na pasta htdocs
   ```bash
    git clone https://github.com/Maycon-Fidelis/Compressor_de_imagens
    ```
   
2. Execute o projeto:
  Acesse no seu navegador:
   ```bash
   localhost/Compressor_de_imagens/
    ```
3. Observações Importantes:
-Verifique se a extensão PHP php_gd2 está ativada no seu servidor. Caso contrário, ative-a no arquivo php.ini.
- Se encontrar um erro como "Permissão negada" ao tentar salvar as imagens comprimidas, ajuste as permissões da pasta usando o seguinte comando:
   ```bash
   chmod -R 777 [localização da pasta]
    ```
  Isso garante que o servidor web tenha permissões adequadas para salvar os arquivos.
