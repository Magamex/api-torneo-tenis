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

## Stack tecnológico
* MongoDB
* NestJS

# Production Build
* Para Construir la imagen en docker ejecutar
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Para visualizar la documentacion swagger
```
localhost:3000/api
```