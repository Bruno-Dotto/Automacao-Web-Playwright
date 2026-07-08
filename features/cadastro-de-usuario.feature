# language: pt
Funcionalidade: Cadastro de usuário
  Como um visitante do QAZANDO Shop
  Quero me cadastrar informando nome, e-mail e senha
  Para poder acessar minha conta

  Contexto:
    Dado que estou na página de cadastro "https://www.automationpratice.com.br/register"

  Cenário: Cadastro com sucesso
    Quando preencho o nome com "Bruno QA"
    E preencho o e-mail com "bruno.qa@example.com"
    E preencho a senha com "senha123"
    E clico em "Cadastrar"
    Então vejo a mensagem "Cadastro realizado!"
    E sou redirecionado para a página "my-account"

  Cenário: Cadastro sem preencher o nome
    Quando deixo o nome em branco
    E clico em "Cadastrar"
    Então vejo a mensagem "O campo nome deve ser prenchido"

  Cenário: Cadastro com e-mail em formato inválido
    Quando preencho o nome com "Bruno QA"
    E preencho o e-mail com "email-invalido"
    E preencho a senha com "senha123"
    E clico em "Cadastrar"
    Então vejo a mensagem "O campo e-mail deve ser prenchido corretamente"

  Cenário: Cadastro com senha menor que 6 dígitos
    Quando preencho o nome com "Bruno QA"
    E preencho o e-mail com "bruno.qa@example.com"
    E deixo a senha em branco
    E clico em "Cadastrar"
    Então vejo a mensagem "O campo senha deve ter pelo menos 6 dígitos"
