#Proyecto NOC

El objetivo es crear una serie de tareas utilizando Arquitectura limpia con Typescript

# dev

1. Duplicar el archivo .env.template y renombrarlo como .env
2. Configurar las variables de entorno

```
PORT=3000
MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

3. Ejecutar el comando

```
npm install
```

4. Levantar las bases de datos con el comando

```
docker compose up -d
```

5. Ejecutar el comando

```
npx prisma migrate dev
```

6. Ejecutar

```
npm run dev
```

## Obtener Gmail Key
