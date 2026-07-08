# Skill: generate-tests

Geração de testes web ponta-a-ponta a partir de uma **URL** e um **título de cenário**. A skill usa o MCP do Playwright para explorar a página real, gera a documentação em Gherkin, cria os testes automatizados no padrão do projeto, executa, corrige falhas e entrega um relatório em Markdown.

## Como usar

No chat do Claude Code, digite:

```
/generate-tests <URL> <título do cenário>
```

- **Primeiro token** = a URL alvo.
- **Restante da linha** = o título/descrição do cenário.

### Exemplos

```
/generate-tests https://www.automationpratice.com.br/register Cadastro de usuário
/generate-tests https://www.automationpratice.com.br/login Login do usuário
/generate-tests automationpratice.com.br/cart Carrinho de compras
```

Se você omitir a URL ou o título, a skill vai pedir antes de continuar. Sem esquema (`http`/`https`), assume `https://`.

## O que a skill faz (em ordem)

| # | Etapa | Saída |
|---|-------|-------|
| 0 | **Pré-flight** — garante `auth/storageState.json` e as pastas necessárias | ambiente pronto para o MCP |
| 1 | **Gherkin** (documentação, sem Cucumber) | `features/<slug>.feature` |
| 2 | **Teste manual exploratório** via MCP Playwright (navega, mapeia elementos, exercita cenários, tira prints) | evidências em `test-reports/evidencias/<slug>/` |
| 3 | **Testes automatizados** no padrão do projeto (`@playwright/test`) | `tests/<slug>.spec.js` |
| 4 | **Execução** dos testes | resultado no terminal |
| 5 | **Correção + revalidação** (loop até passar) | specs ajustados / bugs reportados |
| 6 | **Relatório** | `test-reports/<slug>-<data>.md` |

> `<slug>` = título em kebab-case sem acentos. Ex.: `Cadastro de usuário` → `cadastro-de-usuario`.

## Estrutura de arquivos gerada

```
automacao-web-playwright/
├── features/
│   └── <slug>.feature                 # Gherkin (documentação)
├── tests/
│   └── <slug>.spec.js                 # testes automatizados (Playwright puro)
├── test-reports/
│   ├── <slug>-<data>.md               # relatório
│   └── evidencias/<slug>/*.png        # screenshots do teste manual
└── auth/
    └── storageState.json              # estado do MCP (criado no pré-flight)
```

## Padrão de teste seguido

A skill **não** usa Cucumber — o Gherkin é apenas documentação. Os testes automatizados seguem o padrão já existente do projeto (veja `tests/login.spec.js`):

- `// @ts-check` no topo e `import { test, expect } from '@playwright/test';`
- Nomes de teste e descrições em **português**
- `test.beforeEach` para setup/navegação comum
- Locators na ordem: `getByRole` → `getByLabel`/`getByText` → `page.locator('#id')`
- Asserções baseadas no **comportamento real observado** na página (não em suposições)

## Regras importantes

- **Nunca mascara um bug real da aplicação** para o teste passar. Se a falha for da aplicação, o bug é reportado no relatório e o teste continua refletindo o comportamento esperado.
- As asserções refletem o **texto real** exibido pela aplicação (inclusive typos), não o texto "corrigido".
- Não altera specs existentes nem `playwright.config.js` sem necessidade.

## Pré-requisitos

- Dependências instaladas (`npm install`) e browsers do Playwright (`npx playwright install`).
- MCP do Playwright configurado em [`.mcp.json`](../../../.mcp.json) (já presente neste projeto).
- O passo 0 da skill cria automaticamente o `auth/storageState.json` se ele não existir, evitando o erro `ENOENT` que travava o browser.

## Executar os testes gerados manualmente

```bash
# todos os testes
npx playwright test

# apenas o cenário gerado, em um navegador (mais rápido)
npx playwright test tests/<slug>.spec.js --project=chromium --reporter=list

# relatório HTML nativo do Playwright
npx playwright show-report
```

## Personalização

A skill é definida em [`SKILL.md`](SKILL.md) — um arquivo de instruções em Markdown. Edite-o para ajustar pastas, formato do relatório, navegadores padrão ou regras de asserção.
