# Relatório de Testes — Cadastro de usuário

- **URL:** https://www.automationpratice.com.br/register
- **Data:** 2026-07-07
- **Cenário:** Cadastro de usuário
- **Executado por:** skill `generate-tests`

## Gherkin

Documentação do cenário em [features/cadastro-de-usuario.feature](../features/cadastro-de-usuario.feature). Cobre:

1. Cadastro com sucesso (caminho feliz)
2. Cadastro sem preencher o nome
3. Cadastro com e-mail em formato inválido
4. Cadastro com senha menor que 6 dígitos

## Teste manual exploratório (MCP Playwright)

Explorei a página `/register` navegando pelo browser e mapeando os elementos reais via snapshot de acessibilidade:

- **Campos do formulário:** Nome (`#user`), E-mail (`#email`), Senha (`#password`) e botão **Cadastrar**.
- **Comportamentos observados:**

| Ação | Resultado observado |
|------|---------------------|
| Nome + e-mail válido + senha ≥ 6 caracteres | Modal **"Cadastro realizado!"** com "Bem-vindo {nome}!" e redirecionamento para `/my-account` |
| Nome em branco | Mensagem **"O campo nome deve ser prenchido"** (permanece em `/register`) |
| E-mail sem formato válido (ex.: `email-invalido`) | Mensagem **"O campo e-mail deve ser prenchido corretamente"** |
| Senha em branco / com menos de 6 caracteres | Mensagem **"O campo senha deve ter pelo menos 6 dígitos"** |

- **Evidências (screenshots):**
  - Sucesso: [test-reports/evidencias/cadastro-de-usuario/sucesso-modal.png](evidencias/cadastro-de-usuario/sucesso-modal.png)
  - Erro de senha curta: [test-reports/evidencias/cadastro-de-usuario/erro-senha-curta.png](evidencias/cadastro-de-usuario/erro-senha-curta.png)

> Observação: as mensagens de validação da aplicação contêm o typo "prenchido" (em vez de "preenchido"). As asserções refletem o **texto real** exibido pela aplicação, não o texto corrigido — assim o teste valida o comportamento observado.

## Testes automatizados criados

Arquivo: [tests/cadastro-de-usuario.spec.js](../tests/cadastro-de-usuario.spec.js) — segue o padrão do projeto (`@playwright/test`, `beforeEach`, `getByRole`/`getByText`/`locator`, nomes em PT).

| Teste | O que valida |
|-------|--------------|
| Cadastro com sucesso | Modal "Cadastro realizado!" visível + URL passa a `/my-account` |
| Cadastro sem preencher o nome | Mensagem "O campo nome deve ser prenchido" |
| Cadastro com e-mail em formato inválido | Mensagem "O campo e-mail deve ser prenchido corretamente" |
| Cadastro com senha menor que 6 dígitos | Mensagem "O campo senha deve ter pelo menos 6 dígitos" |

## Resultado da execução

Comando: `npx playwright test tests/cadastro-de-usuario.spec.js --project=chromium --reporter=list`

```
Running 4 tests using 4 workers

  ok 4 [chromium] › Cadastro com senha menor que 6 dígitos (3.8s)
  ok 2 [chromium] › Cadastro com e-mail em formato inválido (3.8s)
  ok 1 [chromium] › Cadastro sem preencher o nome (3.8s)
  ok 3 [chromium] › Cadastro com sucesso (3.8s)

  4 passed (5.1s)
```

- **Total:** 4 | **Passou:** 4 | **Falhou:** 0

## Correções aplicadas

Nenhuma. Todos os testes passaram na primeira execução — os locators e asserções foram baseados diretamente no comportamento observado no teste manual, então não houve necessidade de correção/revalidação.

## Conclusão

Feature de **Cadastro de usuário** validada com sucesso nos 4 cenários (caminho feliz + 3 validações de campo). Nenhum bug de aplicação encontrado. Os testes estão prontos para rodar na suíte (`npx playwright test`). Recomendação: para o cenário de sucesso, considerar dados dinâmicos de e-mail caso a aplicação passe a impedir cadastros duplicados no futuro.
