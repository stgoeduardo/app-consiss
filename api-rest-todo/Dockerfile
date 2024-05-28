# Usar una imagen oficial de nodejs como base
FROM node:19

# Establecer el directorio de trabajo dentro de mi container
Workdir /app/api-rest-todo

# Copiar el package.json y package-lock.json al directorio de trabajo actual (/app)
COPY package*.json ./

# Instalar toda las dependencias del proyecto
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Copiar el resto de la app al directorio de trabajo actual
COPY . .
# COPY app.js ./

# Exponer el puerto donde la app estarà escuchando
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo usando nodemon
CMD ["npm", "run", "start"]
