# Steps para criação do ambiente de desenvolvimento BackEnd

1 - Criar network "adm-rockit" utilizado para conectar os dois containers (FrontEnd e BackEnd) caso não exista ainda:

    docker network create adm-rockit

2 - Criar uma cópia do .env.example:

    cp .env.example .env

3 - Inserir credênciais do banco de dados no .env nos seguintes campos:
- DB_HOST
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

4 - Para testar envio de email local, utilizar serviço do mailtrap. Inserir usuário e senha no .env nos seguintes campos:
- MAIL_USERNAME
- MAIL_PASSWORD

5 - Rodar docker composer para subir ambiente:

    docker compose up -d

6 - URL do ambiente http://localhost:8000/ 

7 - Em ambiente de desenvolvimento, caso faça uso de volume, modifique o owner dos arquivos para www-data e grupo igual ao seu usuário. Caso contrário, poderá ter erro 500 por problema de permissão do docker em ler ou executar arquivos do diretório local montado no host.
