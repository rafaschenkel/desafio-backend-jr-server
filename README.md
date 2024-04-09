# API MusicPlaylistsAPI

Projeto criado para o desafio backend jr da empresa Server Software

## Backend:

API criada com NodeJS v20.11.0, Fastify e PrismaORM, <br/>
Banco de dados Postgres rodando no Docker

### 📋 Pré-requisitos

NodeJS v20.11.0 <br/>
Docker v25.0.3

### 🔧 Instalação

```bash
npm install
docker-compose up -d
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## 🛠️ Construída com

- [NodeJS] (https://nodejs.org/en)
- [Fastify] (https://fastify.dev/)
- [PrismaORM] (https://www.prisma.io/)
