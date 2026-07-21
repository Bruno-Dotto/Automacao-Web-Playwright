# 🚀 Automação Web com Playwright

[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=github-actions&logoColor=white)](https://github.com/Bruno-Dotto/Automacao-Web-Playwright/actions)
[![Relatório Online](https://img.shields.io/badge/Playwright_Report-Online-success?logo=githubpages&logoColor=white)](https://bruno-dotto.github.io/Automacao-Web-Playwright/)

Projeto de automação de testes End-to-End desenvolvido com **Playwright**, utilizando a arquitetura **Page Object Model (POM)** e boas práticas de automação de testes.

O projeto foi desenvolvido com foco em organização, reutilização de código e manutenibilidade, contemplando a separação entre páginas, testes e utilitários, além da geração dinâmica de dados utilizando **Faker**.

## 📊 Relatório da Última Execução

O relatório HTML é publicado automaticamente após cada execução da pipeline através do **GitHub Pages**.

🔗 **Acesse o relatório online:**

https://bruno-dotto.github.io/Automacao-Web-Playwright/

Os testes automatizam os principais fluxos da aplicação:

- Login
- Cadastro de Usuário
- Home
- Checkout

Todo o projeto foi estruturado seguindo boas práticas de desenvolvimento, reutilização de código e integração com pipelines de Integração Contínua (CI).

---

# 📑 Índice

- Funcionalidades
- Tecnologias utilizadas
- Desenvolvimento Assistido por IA
- Arquitetura
- Estrutura de Pastas
- Pré-requisitos
- Instalação
- Execução dos Testes
- Relatórios
- Integração Contínua (CI)
- Autor

---

# ✨ Funcionalidades

- Automação Web com Playwright
- Arquitetura Page Object Model (POM)
- BasePage para reutilização de código
- Geração dinâmica de dados utilizando Faker
- Testes End-to-End
- Execução paralela dos testes
- Relatório HTML
- Screenshots automáticos em falhas
- Vídeos automáticos em falhas
- Trace automático em falhas
- Pipeline automatizada com GitHub Actions

---

# 🛠 Tecnologias utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| Playwright | Framework de automação Web |
| JavaScript (ES6+) | Linguagem utilizada |
| Node.js | Ambiente de execução |
| GitHub Actions | Integração Contínua (CI) |
| Faker | Geração dinâmica de dados |
| Git | Controle de versão |
| GitHub | Hospedagem do repositório |

---

# 🤖 Desenvolvimento Assistido por Inteligência Artificial

Durante o desenvolvimento deste projeto foram utilizadas ferramentas de Inteligência Artificial como apoio à construção da suíte de testes e à produtividade no processo de desenvolvimento.

Ferramentas utilizadas:

- **MCP Playwright:** exploração da aplicação, inspeção de elementos, validação de locators e apoio na construção dos testes.
- **Skill personalizada:** auxílio na geração de cenários em Gherkin, documentação e estrutura inicial dos testes automatizados.

Todas as implementações produzidas com apoio de IA foram revisadas, adaptadas e padronizadas para seguir a arquitetura do projeto, garantindo consistência, legibilidade e facilidade de manutenção do código.

---

# 🏗 Arquitetura do projeto

O projeto segue o padrão **Page Object Model (POM)**, separando responsabilidades para tornar os testes mais organizados, reutilizáveis e fáceis de manter.

Além da separação entre páginas e testes, foi implementada uma **BasePage**, responsável por centralizar comportamentos comuns, reduzindo duplicação de código e mantendo um padrão consistente entre todas as as páginas da aplicação.

Organização da arquitetura:

- **Pages:** locators e ações das páginas.
- **Tests:** suítes de testes.
- **Utils:** funções reutilizáveis.
- **BasePage:** funcionalidades compartilhadas.

---

# 📂 Estrutura de Pastas

```text
AUTOMACAO-WEB-PLAYWRIGHT
│
├── .github/
│   └── workflows/
│
├── auth/
│
├── features/
│
├── pages/
│   ├── BasePage.js
│   ├── CadastroPage.js
│   ├── CheckoutPage.js
│   ├── HomePage.js
│   └── LoginPage.js
│
├── playwright-report/
│
├── test-results/
│
├── tests/
│   ├── cadastro-de-usuario.spec.js
│   ├── checkout.spec.js
│   ├── home.spec.js
│   └── login.spec.js
│
├── utils/
│   └── gerarDados.js
│
├── .gitignore
├── .mcp.json
├── package.json
├── playwright.config.js
└── README.md
```

## Organização das principais pastas

| Pasta | Responsabilidade |
|--------|------------------|
| pages | Implementação do padrão Page Object Model |
| tests | Testes automatizados |
| utils | Funções reutilizáveis |
| features | Cenários documentados em Gherkin |
| playwright-report | Relatório HTML gerado pelo Playwright |
| test-results | Evidências (screenshots, vídeos e traces) |
| auth | Estado de autenticação |
| .github/workflows | Pipeline CI |

---

# ⚙️ Pré-requisitos

- Node.js 18+
- Git
- Visual Studio Code (recomendado)

Verifique as versões instaladas:

```bash
node -v
npm -v
git --version
```

---

# 🚀 Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd AUTOMACAO-WEB-PLAYWRIGHT
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

---

# ▶️ Executando os testes

Executar toda a suíte:

```bash
npx playwright test
```

Executar um arquivo específico:

```bash
npx playwright test tests/login.spec.js
```

Executar somente no Chromium:

```bash
npx playwright test --project=chromium
```

Executar em modo UI:

```bash
npx playwright test --ui
```

Executar em modo Headed:

```bash
npx playwright test --headed
```

Executar em modo Debug:

```bash
npx playwright test --debug
```

---

# 📊 Relatórios

Após cada execução, o Playwright gera automaticamente um relatório HTML.

Abrir relatório:

```bash
npx playwright show-report
```

Quando um teste falha, o projeto gera automaticamente:

- 📸 Screenshot da falha
- 🎥 Vídeo da execução
- 🔍 Trace completo da execução

As evidências ficam disponíveis em:

```text
test-results/
```

O relatório HTML é armazenado em:

```text
playwright-report/
```

Durante a execução da pipeline, o relatório HTML também é disponibilizado como artefato no GitHub Actions.

---

# 🔄 Integração Contínua (CI)

O projeto utiliza **GitHub Actions** para execução automática da suíte de testes.

A pipeline realiza as seguintes etapas:

- Checkout do código
- Instalação das dependências
- Instalação dos navegadores do Playwright
- Execução da suíte de testes
- Geração do relatório HTML
- Publicação do relatório como artefato

---

# 👨‍💻 Autor

**Bruno Dotto**

GitHub:

https://github.com/Bruno-Dotto

LinkedIn:

<www.linkedin.com/in/bruno-zimmermann-dotto-859985423>

---

⭐ Caso este projeto tenha sido útil para você, considere deixar uma estrela no repositório.