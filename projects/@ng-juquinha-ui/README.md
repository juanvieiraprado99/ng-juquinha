<h1 align="center">
NG-Juquinha
</h1>

## 📜 Motivação (opcional)

A biblioteca ng-juquinha primeiramente foi criada por um colega de equipe para atender ao negócio, já que tinhamos problemas com algumas outros bibliotecas, ela foi criada para ser de fácil utilização e não haver problemas entre as versões do angular, foi decidido que as versões do projeto iriam acompanhar a versão do angular.

Me senti inspirado em me basear no trabalho feito e criar uma biblioteca de uso público, que possam utilizar componentes simples, porém muito úteis.

## 📦 Instalação

A instalação pode ser feita com gerenciadores de pacotes como o mais tradicional [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/pt/) ou [bun](https://bun.sh/).

Use o comando no local que deseja criar o projeto, pode começar usando o comando abaixo para criar um projeto na versão do angular 17:

```bash
$ npx -p @angular/cli@17 ng new nome-do-projeto --package-manager gerenciador-de-pacote
```

Após criar o projeto pode entrar na pasta do projeto e inicar o editor de código:

```bash
$ cd nome-do-projeto
$ code .
```

Realize a instalação da biblioteca de acordo com o gerenciador escolhido:

```bash
$ npm install @ng-juquinha/ui
```

```bash
$ pnpm add @ng-juquinha/ui
```

```bash
$ bun i @ng-juquinha/ui
```

Após realizar a instalação, é necessário adicionar os estilos aos arquivo **`angular.json`** ao lado do **`src/styles.scss`**.

```bash
"styles": [
  "src/styles.scss",
  "node_modules/@ng-juquinha/ui/assets/themes/juquinha/theme.scss"
],
```

Pode usar a CLI do angular para iniciar o projeto ou executar o comando de start:

```bash
# Usando a CLI do angular
$ ng serve
```

```bash
# Usando npm
$ npm run start
```

```bash
# Usando pnpm
$ pnpm start
```

```bash
# Usando bun
$ bun start
```

## ✨ Versões

As versões lançadas do ng-juquinha, será sempre para ser compátivel com a versão de mesmo número do [angular](https://angular.dev/).

| @ng-juquinha/ui | Angular |
| --------------- | ------- |
| 17.x.x          | 17.x.x  |

## 🪄 Contribuir com o projeto

Para contribuir com o projeto pode seguir os passos abaixo:

```bash
# A princípio foi criada uma pasta projects dentro de C:
# dentro da pasta projects, tenho o projeto ng-juquinha
# e tenho o projeto com nome testing para quando rodar
# o comando na biblioteca, já instale no projeto testing.

# Realize o clone do projeto
$ git clone https://github.com/juanvieiraprado99/ng-juquinha.git

# Instale as dependências do projeto com o gerenciador de preferência
$ npm install

# Rode o comando abaixo para iniciar o projeto:
$ npm run build-ui-dev

# O storybook está disponível como parte da documentação:
$ npm run storybook
```
