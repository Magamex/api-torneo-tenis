<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

#Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Ejecutar el proyecto en dev:
```
yarn start:dev
```

#### En las .env esta configurado con un volume de la carpeta mongo

## Stack tecnológico
* MongoDB
* NestJS

# Production Build
* Para Construir la imagen en docker ejecutar
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
#### En .env.prod esta configurado para que el contenedor que se arma se conecte a una base de datos de mongo atlas

## Intente subir esto azure y aws pero no lo logre a si que encontre una alternativa 
llamada render... Dejo la URL https://api-torneo.onrender.com/api 

## Para visualizar la documentacion swagger
![image](https://user-images.githubusercontent.com/11765730/210153386-f158cd2f-6d3b-4417-abb3-12a4f982e3be.png)

Si se ejecuta local...
```
localhost:3000/api
```

Desde Render
```
https://api-torneo.onrender.com/api
```
