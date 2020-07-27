<img src="./app/assets/img/logo.svg" alt="To-Do List" width="96">

# Vue Challenge To-Do List

> Desafio Vue.js referente à aplicação **To-Do List**, utilizada como tema pela [Ootz](http://ootz.com.br/) para validação de conhecimentos nesta _stack_ tecnológica.

A estrutura deste projeto foi gerada com o [Nuxt Create App](https://nuxtjs.org/guide/installation/) e utiliza em sua construção componentes Vue estilizados com TailwindCSS. Para uma explicação mais aprofundada de como as coisas funcionam, recomenda-se se respaldar na [documentação do Vue.js](https://br.vuejs.org), na [documentação do Nuxt.js](https://nuxtjs.org) e na [documentação do TailwindCSS](https://tailwindcss.com/docs).

## Desenvolvendo

Embora um requisito comum, sempre vale lembrar: tenha certeza de que o [Node](https://nodejs.org/) está pronto para execução em seu ambiente de desenvolvimento antes de começar. Então, após clonar este repositório, execute em um terminal no diretório raiz do projeto:

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

Isto irá subir a [imagem Node](https://hub.docker.com/_/node/) mais recente, empacotar a solução para distribuição e iniciar um _proxy_ reverso com a [imagem Nginx](https://hub.docker.com/_/nginx) mais recente, servindo a aplicação diretamente em [http://localhost/](http://localhost/). Ou seja, este mesmo comando pode ser utilizado em sua hospedagem de preferência com suporte a Docker para colocar o ambiente para executar.

## Licença

Copyright &copy; 2020.

Licenciado nos termos da [licença MIT](LICENSE).
