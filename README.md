# 🚀 Automação Web com Playwright

Projeto de automação de testes end-to-end desenvolvido com **Playwright**, utilizando a arquitetura **Page Object Model (POM)** e boas práticas de automação de testes.

O projeto foi desenvolvido com foco em organização, reutilização de código e manutenibilidade, contemplando a separação entre páginas, testes e utilitários, além da geração dinâmica de dados utilizando **Faker**.

Os testes automatizam os principais fluxos da aplicação, incluindo:

- Login
- Cadastro de Usuário
- Home
- Checkout

Todo o projeto foi estruturado seguindo boas práticas de desenvolvimento, reutilização de código e integração com pipelines de Integração Contínua (CI).

---

# 🛠 Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

| Tecnologia | Finalidade |
|------------|------------|
| Playwright | Framework de automação Web |
| JavaScript (ES6+) | Linguagem utilizada na automação |
| Node.js | Ambiente de execução |
| GitHub Actions | Execução automatizada dos testes (CI) |
| Faker | Geração dinâmica de dados para testes |
| Git | Controle de versão |
| GitHub | Hospedagem do repositório |

---

## 🤖 Desenvolvimento Assistido por Inteligência Artificial

Durante o desenvolvimento deste projeto foram utilizadas ferramentas de Inteligência Artificial como apoio à construção da suíte de testes e à produtividade no processo de desenvolvimento.

Entre elas:

- **MCP Playwright:** utilizado para exploração da aplicação, inspeção de elementos, validação de locators e apoio na criação dos testes automatizados.
- **Skill personalizada:** utilizada para auxiliar na geração de cenários de teste, documentação em Gherkin e estrutura inicial de testes automatizados.

Todas as implementações produzidas com apoio de IA foram revisadas, adaptadas e padronizadas para seguir a arquitetura do projeto, garantindo consistência, legibilidade e facilidade de manutenção do código.

---

# 🏗 Arquitetura do projeto

O projeto segue o padrão **Page Object Model (POM)**, separando responsabilidades para tornar os testes mais organizados, reutilizáveis e fáceis de manter.

Além da separação entre páginas e testes, foi implementada uma **BasePage**, responsável por centralizar comportamentos comuns, reduzindo duplicação de código e mantendo um padrão consistente entre todas as páginas da aplicação.

A arquitetura está organizada da seguinte forma:

- **Pages:** concentram os locators e as ações de cada página da aplicação.
- **Tests:** contêm as suítes de testes responsáveis pela validação dos fluxos automatizados.
- **Utils:** centralizam funções reutilizáveis, como geração dinâmica de dados para testes.
- **BasePage:** concentra funcionalidades compartilhadas entre todas as páginas da aplicação.

---

# 📂 Estrutura de pastas

A estrutura do projeto foi organizada para separar responsabilidades, facilitar a manutenção e incentivar a reutilização de código.

```text
AUTOMACAO-WEB-PLAYWRIGHT
│
├── .github/
│   └── workflows/              # Pipeline de Integração Contínua (GitHub Actions)
│
├── auth/                       # Estado de autenticação do Playwright
│
├── features/                   # Cenários documentados em Gherkin
│
├── pages/                      # Implementação do padrão Page Object Model
│   ├── BasePage.js
│   ├── CadastroPage.js
│   ├── CheckoutPage.js
│   ├── HomePage.js
│   └── LoginPage.js
│
├── playwright-report/          # Relatórios HTML do Playwright
│
├── test-reports/               # Relatórios e evidências das execuções
│   └── evidencias/
│
├── tests/                      # Testes automatizados
│   ├── cadastro-de-usuario.spec.js
│   ├── checkout.spec.js
│   ├── home.spec.js
│   └── login.spec.js
│
├── utils/                      # Funções auxiliares
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
| **pages/** | Centraliza os locators e as ações de cada página da aplicação seguindo o padrão Page Object Model (POM). |
| **tests/** | Contém as suítes de testes responsáveis por validar os principais fluxos automatizados da aplicação. |
| **utils/** | Reúne funções reutilizáveis, como geração dinâmica de dados para testes. |
| **features/** | Armazena a documentação dos cenários em Gherkin utilizada como apoio ao desenvolvimento. |
| **test-reports/** | Armazena relatórios em Markdown e evidências geradas durante as execuções dos testes. |
| **playwright-report/** | Contém os relatórios HTML gerados automaticamente pelo Playwright após a execução dos testes. |
| **auth/** | Armazena o estado de autenticação utilizado pelo Playwright para reutilização de sessões quando necessário. |
| **.github/workflows/** | Contém a configuração da pipeline de Integração Contínua utilizando GitHub Actions. |

---

# ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de possuir os seguintes requisitos instalados:

- Node.js 18 ou superior
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

Acesse a pasta do projeto:

```bash
cd AUTOMACAO-WEB-PLAYWRIGHT
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

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

Executar utilizando apenas o Chromium:

```bash
npx playwright test --project=chromium
```

Executar em modo visual (UI Mode):

```bash
npx playwright test --ui
```

Executar em modo headed (com navegador visível):

```bash
npx playwright test --headed
```

Executar em modo debug:

```bash
npx playwright test --debug
```

---

# 📊 Relatórios

Após a execução dos testes, o Playwright gera automaticamente um relatório HTML.

Para abrir o relatório:

```bash
npx playwright show-report
```

Além do relatório HTML, o projeto também pode gerar:

- Evidências de execução
- Relatórios em Markdown
- Documentação dos cenários em Gherkin

Todos esses artefatos ficam disponíveis na pasta:

```text
test-reports/
```