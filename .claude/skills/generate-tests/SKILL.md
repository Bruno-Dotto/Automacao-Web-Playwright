---
name: generate-tests
description: Gera testes ponta-a-ponta a partir de uma URL e um título de cenário. Cria o Gherkin (documentação), faz teste manual exploratório da feature usando o MCP do Playwright, cria os testes automatizados no padrão do projeto (@playwright/test), executa os testes, corrige falhas, revalida e gera um relatório em Markdown. Invocada com "/generate-tests <url> <título do cenário>".
---

# generate-tests

Fluxo completo de geração de testes web para este projeto Playwright.

## Entrada

O usuário invoca `/generate-tests <URL> <título do cenário>`.

- **Primeiro token** = a URL alvo (ex.: `https://www.automationpratice.com.br/login`).
- **Restante da linha** = o título/descrição do cenário de teste (ex.: `Login do usuário`).

Se a URL ou o título estiverem faltando, peça ao usuário antes de continuar. Se a URL não tiver esquema (`http`/`https`), assuma `https://`.

Crie um **slug** em kebab-case a partir do título (sem acentos, minúsculas, espaços → `-`). Ex.: `Login do usuário` → `login-do-usuario`. Use esse slug para nomear os arquivos.

## Padrão do projeto (SIGA à risca)

Este projeto usa **Playwright puro** (`@playwright/test`), **sem** Cucumber. Os specs ficam em `tests/*.spec.js`. Observe o padrão existente em [tests/login.spec.js](../../../tests/login.spec.js):

- Cabeçalho `// @ts-check` na primeira linha.
- `import { test, expect } from '@playwright/test';`
- Nomes de teste e descrições **em português**.
- Use `test.beforeEach` para navegação/setup comum quando fizer sentido.
- Prefira locators nesta ordem: `getByRole` → `getByLabel`/`getByText` → `page.locator('#id')` como último recurso.
- Um `expect` de asserção claro por cenário (visibilidade de heading, texto de erro, URL, etc.).
- Não crie Page Objects novos a menos que o projeto já use — hoje **não usa**.

## Ferramentas

Use o **MCP do Playwright** (ferramentas `mcp__playwright__browser_*`) para o teste manual exploratório: navegar, tirar snapshot de acessibilidade, clicar, digitar, preencher formulários, capturar console e screenshots. Use `browser_snapshot` para descobrir os locators reais (roles, nomes acessíveis, ids) — **não invente seletores**; baseie os testes no que você observou na página real.

## Passos

Rastreie o progresso com TodoWrite. Execute na ordem:

### 0. Pré-flight (setup do MCP)
O MCP do Playwright deste projeto (ver [.mcp.json](../../../.mcp.json)) inicia com `--storage-state=auth/storageState.json`. Se esse arquivo **não existir**, a primeira chamada de browser falha com `ENOENT ... auth/storageState.json` e o fluxo trava.

- Verifique se `auth/storageState.json` existe.
- Se **não** existir, crie-o com um estado vazio válido antes de qualquer chamada `browser_*`:
  ```json
  {
    "cookies": [],
    "origins": []
  }
  ```
- Garanta também que as pastas `features/` e `test-reports/evidencias/<slug>/` existam antes de gerar artefatos/screenshots (o MCP não cria pastas sozinho).

### 1. Gherkin (documentação)
- Crie `features/<slug>.feature` com o cenário em Gherkin, em português (`Funcionalidade`, `Cenário`, `Dado`/`Quando`/`Então`).
- Cubra o caminho feliz e os principais caminhos de erro/borda que fizerem sentido para a feature (ex.: campos inválidos, campos vazios).
- Este arquivo é **apenas documentação** — não configure Cucumber.

### 2. Teste manual exploratório (MCP Playwright)
- `browser_navigate` para a URL.
- `browser_snapshot` para mapear a página: elementos, roles, nomes acessíveis, mensagens.
- Exercite manualmente cada cenário do Gherkin (preencher, clicar, submeter) e **observe o comportamento real** (mensagens de sucesso/erro, redirecionamentos, validações).
- Tire `browser_take_screenshot` de evidências relevantes (salve em `test-reports/evidencias/<slug>/`). O caminho do `filename` é relativo à **raiz do projeto** e a pasta precisa já existir (crie no passo 0).
- Capture `browser_console_messages` se houver erros de console pertinentes.
- Anote os locators e comportamentos observados — eles alimentam os testes automatizados e o relatório.
- Ao terminar a exploração, `browser_close`.

### 3. Testes automatizados
- Crie `tests/<slug>.spec.js` seguindo **exatamente** o padrão do projeto (ver seção acima).
- Baseie os locators e asserções no que foi observado no passo 2 (não em suposições).
- Um `test(...)` por cenário do Gherkin. Use `beforeEach` para o setup comum.

### 4. Execução
- Rode apenas o novo arquivo: `npx playwright test tests/<slug>.spec.js --reporter=list`.
- Se preferir um navegador só para acelerar: acrescente `--project=chromium`.

### 5. Correção e revalidação (loop)
- Se **algum teste falhar**, analise a causa real (locator errado, timing, asserção incorreta, ou bug de fato na aplicação).
  - Se for problema do teste: corrija o spec.
  - Se parecer **bug da aplicação**: NÃO force o teste a passar — registre como bug no relatório e mantenha o teste refletindo o comportamento esperado (pode marcar com `test.fail` documentando o motivo).
- Rode novamente `npx playwright test tests/<slug>.spec.js --reporter=list` e confirme que passou.
- Repita até verde ou até concluir que a falha é bug da aplicação (documentado). Não desista silenciosamente de um teste.

### 6. Relatório
Crie `test-reports/<slug>-<data>.md` (data no formato AAAA-MM-DD). Conteúdo:

```markdown
# Relatório de Testes — <Título do cenário>

- **URL:** <url>
- **Data:** <AAAA-MM-DD>
- **Cenário:** <título>

## Gherkin
(caminho para o .feature e resumo dos cenários)

## Teste manual exploratório
- O que foi explorado, comportamentos observados, prints (links para evidências).

## Testes automatizados criados
- Lista de testes em `tests/<slug>.spec.js` com o que cada um valida.

## Resultado da execução
- Total / passou / falhou. Cole o resumo do `--reporter=list`.

## Correções aplicadas
- Falhas encontradas e como foram resolvidas (ou bugs reportados na aplicação).

## Conclusão
- Status final e recomendações.
```

## Regras
- Toda saída visível ao usuário e os artefatos em **português**.
- Não modifique specs existentes nem `playwright.config.js` sem necessidade.
- Nunca faça um teste passar mascarando um bug real da aplicação — reporte.
- Ao final, mostre ao usuário: caminho do `.feature`, do spec, o resultado da execução e o caminho do relatório.
