# Utilizar la imagen oficial de Node.js como base
FROM node:19

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/app-todo-consiss

# Copiar los archivos de configuración y dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install -g @ionic/cli
RUN npm install -f

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación (esto depende de cómo se configura Ionic en el proyecto)
EXPOSE 8100

# Comando por defecto para iniciar la aplicación
CMD ["ionic", "serve", "--address", "0.0.0.0"]