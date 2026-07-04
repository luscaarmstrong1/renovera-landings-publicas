# Kairós Landings Públicas

## Objetivo do projeto

Monorepo de landings públicas para linhas de atuação em energia, projetos elétricos, solar, consultoria e eletropostos.

## Problema que resolve

Agrupa páginas publicáveis para comunicação técnica e comercial de diferentes frentes do portfólio.

## Demonstração visual

![Screenshot desktop](docs/screenshots/home-desktop.png)

![Screenshot mobile](docs/screenshots/home-mobile.png)

## Tecnologias utilizadas

- Node.js
- npm workspaces
- Vite
- TypeScript
- GitHub Pages

## Recursos principais

- Monorepo com apps em `apps/*`
- Scripts de build compostos
- Portal público
- Publicação estática

## Acesso público

GitHub Pages: https://luscaarmstrong1.github.io/renovera-landings-publicas/

## Como executar localmente

Pré-requisitos: Node.js compatível com o projeto e o gerenciador indicado pelo lockfile (`package-lock.json` ou `pnpm-lock.yaml`).

```bash
npm install
npm run build
```

Quando houver scripts específicos no `package.json`, use também `npm run dev`, `npm run test`, `npm run lint` ou os comandos equivalentes documentados no próprio arquivo.

## Estrutura do projeto

- `src/`, `app/` ou `apps/`: código da interface, conforme o framework do repositório.
- `public/`: assets estáticos publicados com a aplicação.
- `docs/screenshots/`: capturas reais da página publicada.
- `.github/workflows/`: automações de build/deploy quando presentes.
- `scripts/`: rotinas auxiliares de build, auditoria ou validação quando presentes.

## Limitações e avisos técnicos

Este repositório é uma demonstração técnica ou produto em evolução. O conteúdo não substitui projeto executivo, estudo de conexão, validação regulatória, parecer técnico, proposta comercial definitiva ou análise jurídica. Funcionalidades, cálculos e textos devem ser revisados antes de uso profissional.

## Privacidade e segurança

Não inclua tokens, chaves, credenciais, dados pessoais sensíveis ou arquivos `.env` em commits. Em demonstrações públicas, use dados fictícios ou anonimizados. Quando houver `.env.example`, trate-o apenas como referência de configuração.

## Status

Monorepo de demonstrações públicas em evolução.
