# Steps para criação do ambiente de desenvolvimento FrontEnd

1 - Criar network "adm-rockit" utilizado para conectar os dois containers (FrontEnd e BackEnd) caso não exista ainda:

    docker network create adm-rockit

1.1 - Apenas durante a instalação do projeto. Acesse o diretório do project e execute o comando:

    docker-compose build

2 - Rodar docker composer para subir ambiente:

    docker-compose up -d

3 - URL do ambiente http://localhost:3000/ 
