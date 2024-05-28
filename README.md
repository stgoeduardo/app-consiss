# App Consiss: Tomar en cuenta lo siguiente

## Consideraciones

- Necesitamos tener instalado **docker-desktop**

Entonces, debemos abrir una terminal, y clonar este repositorio de la siguiente manera:

```sh
git clone https://github.com/stgoeduardo/app-consiss.git
```
Una vez clonado el repositorio, nos situamos en la carpeta desde la misma terminal:

```sh
cd app-consiss
```

Una vez adentro, tecleamos el siguiente comando:

```sh
docker-compose up --build
```

Utilizamos Docker Compose para iniciar y construir los servicios definidos en el archivo `docker-compose.yml`, el principal, el que está en la raíz. 
Una vez terminado, podemos empezar a acceder a nuestro servidor hecho en **nodejs + expressjs + mongodb + mongoose**, también podemos acceder a nuestra bd en mongo y a la aplicación hecha en **ionic 7 + angular** (frontend).

## Servicios
docker-compose up --build, nos levanta los siguientes servicios en nuestro contenedor:

| Servicios | URL |
| ------ | ------ |
| MongoDB | [Base de datos NoSQL local](http://localhost:8081) con user: admin y password: admin|
| Backend | [Servidor en nodejs](http://localhost:3000) |
| Frontend | [Aplicación hecha en ionic](http://localhost:8100) |

# Importante

Si no se puede levantar todo con el archivo docker-compose.yml que está en la raíz del directorio, entonces cuando clonemos el repositorio, necesitariamos instalar de una por una las aplicaciones:

## NOTA
 
 Es importante tener instalado **node en la version 19.9.0**, que es la que se uso para hacer este proyecto y ionic en la version 7.

### Backend

Necesitamos situarnos en la carpeta del backend (**api-rest-todo**):
```sh
cd api-rest-todo
```
Luego tecleamos el siguiente comando para instalar las dependencias:
```sh
npm i
```
Finalizado, procedemos a levantar el proyecto:
```sh
npm run start
```
y tecleamos la siguiente url: **http://localhost:3000** en el navegador para corroborar que el servidor ya está arriba.

### Mongo
Abrimos un editor de codigo y abrimos nuestro proyecto de backend ahi, buscamos el archivo **app-consiss/api-rest-todo/config/db.js**, y en la linea 13, sustituimos la variable por este valor:
```sh
process.env.MONGO_URI || 'mongodb+srv://admin:ihRqpifnEJwfkCvm@tododb.vwo70cj.mongodb.net/'
```
Y con eso tendriamos un cluster en mongodb atlas para consultar la BD.

### Frontend
Y por ultimo, necesitamos situarnos en la carpeta del frontend (**app-todo-consiss**):
```sh
cd app-todo-consiss
```
Luego tecleamos:
```sh
npm i
```
Finalizado, procedemos a levantar el proyecto en ionic:
```sh
ionic serve
```
y tecleamos la siguiente url: **http://localhost:8100** en el navegador para corroborar que el frontend ya está arriba y que lo podemos usar.
