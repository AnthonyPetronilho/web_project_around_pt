# Around The U.S.

Projeto de interface interativa para exibir cartões de locais com funcionalidades de criação, curtir, exclusão com confirmação, edição de perfil, atualização de avatar e visualização ampliada de imagens.

## Descrição

Este projeto implementa uma página onde usuários podem:

- Ver cartões renderizados dinamicamente a partir de um template HTML.
- Criar novos cartões pelo pop-up **"Novo local"**.
- Editar nome e descrição do perfil pelo pop-up **"Editar perfil"**.
- Atualizar a foto do perfil (avatar) via pop-up.
- Curtir e descurtir cartões (com sincronização com a API).
- Excluir cartões individualmente (com confirmação).
- Abrir a imagem do cartão em um pop-up para visualização em tamanho maior com legenda.

## Funcionalidades

**Integração com API**

- Carrega dados do usuário e cartões iniciais ao iniciar a página.
- Atualiza perfil e avatar via requisições.
- Adiciona e remove cartões via requisições.
- Curte/descurte cartões via requisições.

**Formulário "Novo local"**

- Abre ao clicar no botão **"+"**.
- Cria um novo cartão no topo do container.
- Fecha automaticamente após o envio e limpa o formulário.

**Formulário "Editar perfil"**

- Preenche o formulário com os dados atuais.
- Atualiza o título e a descrição do perfil.

**Atualização de avatar**

- Abre ao clicar no ícone de edição sobre a foto do perfil.
- Atualiza a imagem do perfil após confirmação da API.

**Curtidas**

- Alterna o estado visual do botão de curtir.
- Sincroniza o estado com a API.

**Exclusão de cartões com confirmação**

- Ao clicar na lixeira, abre o pop-up "Tem certeza?".
- O cartão é removido após confirmação e resposta da API.

**Pop-up de imagem**

- Ao clicar na imagem do cartão, exibe a versão ampliada com legenda.
- Fechamento por botão, overlay e tecla **Esc**.

**Validação de formulários**

- Exibe mensagens de erro e controla estado do botão de submit.

**Aprimoramento de UX**

- Durante requisições (editar perfil, adicionar cartão e avatar), o botão exibe **"Salvando..."** até a conclusão.

## Tecnologias Utilizadas

- HTML5
- CSS3 (BEM, responsividade)
- JavaScript (ES6 Modules, DOM, eventos, classes)

## Link para o projeto

https://around-the-us-anthony.netlify.app/
