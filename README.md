# 🩺 Doutor Agenda

Sistema de agendamento para clínicas médicas, desenvolvido como projeto pessoal com foco em aprendizado e simulação de um cenário real de produto.

Este foi meu **primeiro projeto utilizando Node.js, TypeScript, React e Next.js**, cobrindo desde o backend até o deploy.

---

## 🚀 Demo

🔗 https://doutor-agenda-neon.vercel.app/authentication 
Usuário teste: teste@email.com
senha: 123456789

> O projeto está em constante evolução e pode conter alguns bugs pontuais.

---

## ⚙️ Funcionalidades

- Autenticação de usuários
- Dashboard com métricas da clínica
- Cadastro de médicos
- Cadastro de especialidades
- Cadastro de pacientes
- Agendamento de consultas
- Visualização de faturamento
- Interface responsiva

---

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- React
- Next.js
- PostgreSQL
- Prisma ORM
- Tailwind CSS

---

## ▶️ Rodando o projeto localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/doutor-agenda.git

# Entre na pasta do projeto
cd doutor-agenda

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env baseado no .env.example

# Execute as migrações do banco
npx prisma migrate dev

# Inicie o projeto
npm run dev