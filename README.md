<img src="./assets/img/logo.svg" alt="To-Do List" width="96">

# Vue Challenge To-Do List

> Desafio Vue.js referente à aplicação *To-Do List*, utilizada como tema pela [Ootz](http://ootz.com.br/) em processos de seleção.

A estrutura deste projeto foi gerada com o [Nuxt Create App](https://nuxtjs.org/guide/installation/). Para uma explicação mais aprofundada de como as coisas funcionam, recomenda-se estudar a [documentação do Nuxt.js](https://nuxtjs.org).

## Desenvolvendo

É provável que você já saiba, mas sempre vale lembrar: tenha certeza que o [Node](https://nodejs.org/) está pronto para execução em seu ambiente de desenvolvimento antes de começar. Então, após clonar este repositório, execute em um terminal no diretório raiz do projeto:

``` bash
npm install
```

Em seguida, ainda no mesmo terminal, execute:

``` bash
$ npm run dev
```

Isto iniciará a aplicação em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) para poder visualizar no navegador. No modo de desenvolvimento, o recurso de recarrega automática (_hot reloading_) vem habilitado por padrão ao se realizar alterações no código, ou seja, basta realizar alguma mudança e observar o resultado em tempo real no navegador.

## Publicando

Para simular um ambiente de produção real, este projeto utiliza [Docker](https://www.docker.com/). Garanta que o ambiente de execução esteja com ele adequadamente instalado e executando.

Então, em um terminal no diretório raiz do projeto, execute:

``` bash
$ npm start
```

Isto irá subir a [imagem Node](https://hub.docker.com/_/node/) mais recente, empacotar a solução para distribuição e iniciar um _proxy_ reverso com a [imagem Nginx](https://hub.docker.com/_/nginx) mais recente, servindo a aplicação diretamente em [http://localhost/](http://localhost/). Ou seja, basicamente este simples comando pode ser utilizado em sua hospedagem de preferência com suporte a Docker.

## Licença

Copyright &copy; 2020.

Licenciado nos termos da [licença MIT](LICENSE).
