# Sistema de reservas de quarto com Microserviços

<img src="https://miro.medium.com/v2/resize:fit:1400/0*xf_i7XhElOvpglaQ.png" width="100%">

## Integrantes

- **Nome:** Matheus Cardoso
- **Nome:** Erick Furtado
- **Nome:** Pedro Vitor Marques
- **Nome:** Rogger Martins
- **Nome:** José Henrike Andreatta

## Descrição

Este projeto é um sistema de reservas de quartos de hotel que foi desenvolvido utilizando a arquitetura de microserviços. Ele é composto por três serviços: um serviço de busca de quartos, um serviço de reserva e um serviço de cancelamento de reserva.

## Tecnologias

- **Node.js:** O Node.js é uma plataforma construída sobre o motor JavaScript do Chrome para facilmente construir aplicações de rede rápidas e escaláveis.
- **Express:** O Express é um framework para aplicativos da web do Node.js.
- **Swagger:** O Swagger é uma ferramenta de software que ajuda a documentar, projetar, construir e consumir serviços da Web.

## Instalação

Para instalar as dependências do projeto, execute o comando (em cada um dos diretórios dos serviços):

```bash
npm install
```

## Execução

Para executar o projeto, execute o comando (em cada um dos diretórios dos serviços):

```bash
npm start
```

## Serviços

### Serviço de busca de quartos
Este serviço gerencia informações sobre hotéis e a disponibilidade de quartos.

- **URL Base:** http://localhost:7070
- **URL da documentação:** http://localhost:7070/documentacao

### Serviço de reserva
Este serviço gerencia o processo de reserva de quarto.

- **URL Base:** http://localhost:7071
- **URL da documentação:** http://localhost:7071/documentacao

### Serviço de cancelamento de reserva
Este serviço gerencia o processo de cancelamento de reserva de quarto.

- **URL Base:** http://localhost:7072
- **URL da documentação:** http://localhost:7072/documentacao
