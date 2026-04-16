# MyFinanceFlow

Aplicação web para gerenciamento financeiro desenvolvida com React e TypeScript. Trata e exibe receitas e despesas em um dashboard com resumos e gráficos, além de telas para cadastro, edição e exclusão de transações e categorias, com filtros, busca e paginação nas listagens.

**A versão publicada no deploy é uma demonstração:** nessa build o app usa **`localStorage`** do navegador para persistir transações e categorias. Em desenvolvimento local, é utilizado API REST com **json-server** e o arquivo `database.json`.

## Funcionalidades

- Dashboard com cards de saldo, receitas, despesas e economias
- Gráficos de receita x despesa e distribuição por categoria 
- Listagem de transações com filtros por tipo, busca por texto e paginação
- Cadastro, edição e exclusão de transações (receita ou despesa) com categoria associada
- Listagem de categorias com busca e paginação
- Cadastro, edição e exclusão de categorias
- Formulários com forte validação e feedback de sucesso ou erro 
- Tema claro e escuro persistido no navegador
- Modo demonstração no deploy, substitui chamadas HTTP por leitura/gravação em `localStorage` (transações e categorias)

## Decisões Técnicas

- **TanStack React Query** Para gerenciamento de dados assíncronos, utilizando queries e mutations
- **React Router** para navegação entre dashboard, transações e categorias
- **React Hook Form** com **Zod** para validação e tipagem dos formulários
- **Axios** para consumo de APIs, configurado com variáveis de ambiente e validadas com Zod
- **json-server** e arquivo `database.json` como backend local quando o demo está desligado
- **localStorage** como persistência apenas no modo demo
- Interface com **shadcn/ui** e **Tailwind CSS**, priorizando responsividade, acessibilidade e usabilidade
- **Recharts** para visualização dos dados financeiros no dashboard
- **react-helmet-async** para títulos de página
- Estrutura em páginas, componentes reutilizáveis e camada `api` separada das views
- **Vitest, Testing Library e Happy Dom** para testes unitários de componentes

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- React Hook Form
- Zod
- Axios
- json-server
- Recharts
- Vitest, Testing Library e Happy DOM

## Como rodar o projeto
- Faça o clone do repositório 
- Instale as dependências com ```pnpm install```
- Crie um arquivo .env e adicione:
```
VITE_API_URL="http://localhost:3000/"
VITE_APP_DEMO=false
```
- Execute o projeto com ```pnpm run dev```
- Execute o servidor com ```pnpm run server```
- Altere para ```VITE_APP_DEMO=true``` caso queira utilizar a versão demosntração

## Resultados

### Dashboard

<img width="1919" height="1200" alt="Captura de tela de 2026-04-14 21-24-13" src="https://github.com/user-attachments/assets/0757bbd2-9f34-4076-b11f-7b9d46831a5c" />


### Transações

<img width="1920" height="1200" alt="Captura de tela de 2026-04-14 21-24-25" src="https://github.com/user-attachments/assets/e523128b-b214-45c5-8388-6dac3c29544b" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/573f2f8d-aed1-4863-94e6-d7541ec43827" />


### Categorias

<img width="1920" height="1200" alt="Captura de tela de 2026-04-14 21-24-34" src="https://github.com/user-attachments/assets/c28c61ff-3530-4651-8ae8-224ddcd77330" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/832242d3-5730-4a20-b660-fc98a0cfd751" />

## Links Úteis

- [Linkedin](https://www.linkedin.com/in/guilherme-silva-evangelista)
- [Portfólio](https://portfolio-guilherme-evangelista.vercel.app/)
