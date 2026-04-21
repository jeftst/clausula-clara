# Cláusula Clara

IA para explicar contratos e alertar sobre riscos antes da assinatura.

## Visão geral

Este projeto é um MVP sem custo pensado para rodar no plano gratuito da Vercel.
Ele recebe contratos em PDF textual, DOCX ou TXT, extrai o conteúdo e usa IA para devolver uma análise simples para pessoas leigas.

## Funcionalidades

- Upload de arquivo PDF, DOCX e TXT
- Colar texto manualmente
- Extração de texto do contrato
- Resumo simples em português claro
- Identificação de valores, vigência, reajuste e multa
- Pontos de atenção
- Perguntas antes de assinar
- Nível final de atenção: baixo, médio ou alto

## Limites desta versão

- Sem OCR
- Sem login
- Sem banco de dados
- Sem armazenamento permanente de arquivos
- Limite de 2 MB por arquivo
- Limite de 20.000 caracteres por análise

## Tecnologias

- Next.js
- TypeScript
- Tailwind CSS
- pdf-parse
- mammoth
- Gemini ou Groq

## Como rodar localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Depois preencha sua chave de API.

### 3. Rode em ambiente local

```bash
npm run dev
```

### 4. Abra no navegador

```bash
http://localhost:3000
```

## Como subir na Vercel

1. Suba este projeto para o GitHub
2. Importe o repositório na Vercel
3. Adicione as variáveis do `.env.example` na área de Environment Variables
4. Faça o deploy

## Estrutura principal

```bash
app/
  api/analyze/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
lib/
```

## Observação importante

A análise é informativa e não substitui revisão jurídica profissional.
