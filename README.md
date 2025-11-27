# Around The U.S.

Projeto de interface interativa para exibir cartões de locais com funcionalidades de criação, curtir, exclusão e visualização ampliada de imagens.

## Descrição

Este projeto implementa uma página onde usuários podem:

- Ver cartões gerados dinamicamente a partir de um template HTML.
- Criar novos cartões pelo pop-up "Novo local".
- Editar nome e descrição do perfil pelo pop-up "Editar perfil".
- Curtir e descurtir cartões.
- Excluir cartões individualmente.
- Abrir a imagem do cartão em um pop-up para visualização em tamanho maior com legenda.

## Funcionalidades

- Renderização dinâmica de cartões via `<template>`
  - Dados iniciais em `initialCards`.
  - Valores padrão: nome = "Lugar sem nome" e imagem = `./images/placeholder.jpg` quando ausentes.
- Formulário "Novo local"
  - Abre ao clicar no botão "+".
  - Cria um novo cartão no topo do container.
  - Fecha automaticamente após o envio e limpa o formulário.
- Botão de curtir por cartão
  - Alterna a classe `card__like-button_is-active` para refletir o estado visual.
- Exclusão de cartões
  - Remove o cartão do DOM ao clicar no ícone de lixeira.
- Pop-up de imagem
  - Ao clicar na imagem do cartão, exibe a versão ampliada com legenda.
  - Fechamento por botão, overlay e tecla Esc.
- Pop-up "Editar perfil"
  - Preenche o formulário com os dados atuais.
  - Atualiza o título e a descrição do perfil.

## Tecnologias Utilizadas

- HTML5 (estrutura semântica)
- CSS3 (BEM, responsividade)
- JavaScript (DOM, eventos, manipulação de classes)

## Link para o projeto

https://anthonypetronilho.github.io/web_project_around_pt/
