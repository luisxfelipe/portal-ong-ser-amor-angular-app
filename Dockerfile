# =================================================================
# ESTÁGIO 1: "base" ou "development" - Ambiente para Desenvolvimento
# =================================================================
# Define a imagem Node.js base
FROM node:22.19.0-trixie-slim AS base

# Define o ambiente Node.js como desenvolvimento
ENV NODE_ENV=development

# Instala pacotes  úteis do sistema operacional
RUN apt-get update && apt-get install -y git git-flow curl && apt-get clean -y

# Define o diretório de trabalho padrão dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies)
RUN npm ci

# Copia o restante do código-fonte (pode ser sobrescrito por volumes)
COPY . .

# Muda para o usuário não-root 'node'
USER node

# =================================================================
# ESTÁGIO 2: "production" - Imagem final otimizada para produção
# =================================================================
FROM node:22.19.0-trixie-slim AS builder

# Define o diretório de trabalho padrão
WORKDIR /usr/src/app

# Define o ambiente Node.js como produção
# ENV NODE_ENV=production

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm ci

# Copia o código-fonte necessário para o build
COPY . .

# Gera o build otimizado da aplicação Angular
RUN npm run build

# Muda para o usuário não-root 'node' (existente na imagem base)
USER node

# =================================================================
# ESTÁGIO 3: Servidor web leve com nginx para servir os arquivos estáticos
# =================================================================
FROM nginx:1.27-alpine AS production

# Copia o build do Angular do estágio anterior
COPY --from=builder /usr/src/app/dist/portal-ong-ser-amor-angular-app/browser /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
