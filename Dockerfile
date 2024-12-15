# Usar uma imagem base do Node.js
FROM node:18-alpine
# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos de package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências, incluindo ts-node
RUN npm install && \
    npm install -g typescript ts-node

# Copiar o restante dos arquivos da aplicação
COPY . .
EXPOSE 1883
# Comando para iniciar o servidor em modo de desenvolvimento com nodemon e ts-node
CMD ["npm","run","start"]
