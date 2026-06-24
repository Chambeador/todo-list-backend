# Todo List 2

Proyecto web desarrollado para la gestión de listas de tareas por usuario. La aplicación permite registrarse, iniciar sesión y administrar tareas de manera sencilla. Además, cuenta con almacenamiento de archivos mediante Cloudinary y utiliza HTTPS en entorno local para realizar pruebas de forma segura.

## Descripción

El objetio de este proyecto es ayudar a organizar tareas mediante listas personalizadas para cada usuario. Cada persona puede iniciar sesión y acceder únicamente a sus propias listas y tareas.

Además, es posible crear, ver y editar tareas, así como subir archivos relacionados. Para el almacenamiento de archivos se utiliza Cloudinary y para la autenticación se emplea JWT.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- Axios

### Backend
- Node.js
- Express
- Prisma ORM
- JWT
- bcryptjs
- multer
- Cloudinary
- HTTPS local con certificados

### Base de datos
- PostgreSQL
- Supabase

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Autenticación con JWT.
- Visualización de TodoLists del usuario autenticado.
- Visualización de Tasks dentro de cada TodoList.
- Edición de tareas.
- Creación de tareas.
- Eliminación lógica de tareas.
- Subida y consulta de archivos asociados a una lista.
- Conexión segura mediante HTTPS.

## Estructura del proyecto

```txt
todo-list-backend/
├── backup.txt
├── backend/
│   ├── app.js
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── prisma/
│   ├── prisma.config.ts
│   ├── models/
│   ├── src/
│   ├── package.json
│   ├── cert.pem
│   └── key.pem
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│
└── README.md
```
## Modelo de base de datos

La base de datos está organizada de la siguiente forma:

- **User**: almacena los datos de autenticación del usuario.
- **TodoList**: representa una lista de tareas perteneciente a un usuario.
- **Task**: representa una tarea dentro de una TodoList.
- **File**: almacena archivos asociados a una TodoList.

### Relaciones principales

- Un **User** puede tener muchas **TodoLists**.
- Una **TodoList** puede tener muchas **Tasks**.
- Una **TodoList** puede tener muchos **Files**.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- Node.js 18 o superior
- npm
- Git
- mkcert
- PostgreSQL o acceso a Supabase

## Pasos para ejecutar el proyecto en localhost

### 1. Clonar el repositorio

```bash
git clone https://github.com/Chambeador/todo-list-backend.git
cd todo-list-backend
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

### 4. Crear el archivo de variables de entorno del backend

Por motivos de seguridad, el archivo `.env` no se incluye dentro del repositorio. Antes de ejecutar la aplicación se debe crear el archivo `backend/.env`.

### Archivo requerido

```env
backend/.env

DATABASE_URL="postgresql://usuario:password@host:5432/base_de_datos"

CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
```

### Descripción de las variables

- **DATABASE_URL**: cadena de conexión utilizada por Prisma ORM para acceder a la base de datos PostgreSQL alojada en Supabase.
- **CLOUDINARY_CLOUD_NAME**: nombre de la cuenta de Cloudinary.
- **CLOUDINARY_API_KEY**: clave pública de acceso a Cloudinary.
- **CLOUDINARY_API_SECRET**: clave privada utilizada para la autenticación y carga de archivos.

### 5. Configurar Cloudinary

La aplicación utiliza Cloudinary para almacenar y gestionar los archivos que son cargados por los usuarios.

1. Ingresar al sitio oficial de Cloudinary:  
   `https://cloudinary.com/`
2. Crear una cuenta nueva o iniciar sesión utilizando una cuenta de GitHub, Google o correo electrónico.
3. Una vez iniciada la sesión, dirigirse al Dashboard principal.
4. En el panel principal se mostrarán las credenciales necesarias para la configuración:
   - Cloud Name
   - API Key
   - API Secret
5. Copiar estos valores y reemplazarlos dentro del archivo `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME="valor_obtenido_del_dashboard"
CLOUDINARY_API_KEY="valor_obtenido_del_dashboard"
CLOUDINARY_API_SECRET="valor_obtenido_del_dashboard"
```

6. Guardar los cambios y reiniciar el servidor backend.

### 6. Configurar la base de datos

La aplicación utiliza PostgreSQL mediante Supabase y Prisma ORM.

Se debe crear una base de datos PostgreSQL y reemplazar el valor de `DATABASE_URL` con la cadena de conexión correspondiente:

```env
DATABASE_URL="postgresql://usuario:password@host:5432/base_de_datos"
```

Una vez configurada la conexión, ejecutar las migraciones de Prisma para crear las tablas necesarias:

```bash
cd backend
npx prisma migrate deploy
```

Si se desea crear la estructura directamente desde el esquema de Prisma:

```bash
cd backend
npx prisma db push
```

Esto generará las tablas necesarias para usuarios, listas de tareas, tareas y archivos.

### 7. Cargar la base de datos de prueba desde `backup.txt` (OBLIGATORIO)

Además de la estructura generada por Prisma, se ha creado un archivo llamado `backup.txt` ubicado en la raíz del proyecto `todo-list-backend/`.

Este archivo contiene datos de ejemplo ya listos para pruebas, incluyendo un usuario, varias listas de tareas, tareas asociadas y algunos archivos.

Este paso es obligatorio para poder probar correctamente la aplicación con datos cargados.  
Sin este archivo, la base de datos queda vacía y no se podrá validar el sistema completo con información de prueba.

### ¿Qué contiene el backup?

- Un usuario de prueba.
- Varias listas de tareas.
- Tareas asociadas a las listas.
- Archivos de ejemplo almacenados en Cloudinary.

### Restauración de datos de prueba

Una vez creada la estructura de la base de datos con Prisma, se debe abrir el archivo `backup.txt`, copiar todo su contenido y ejecutarlo en la base de datos PostgreSQL utilizando alguna de las siguientes herramientas:

- pgAdmin
- DBeaver
- Supabase SQL Editor
- Terminal de PostgreSQL

Ejemplo desde terminal:

```bash
psql -h <host> -U <usuario> -d <base_de_datos>
```

Donde:

- **host**: dirección del servidor donde se encuentra la base de datos PostgreSQL. Si se utiliza Supabase, este valor puede encontrarse dentro de la cadena de conexión proporcionada por el proyecto.
- **usuario**: nombre del usuario con permisos para conectarse a la base de datos.
- **base_de_datos**: nombre de la base de datos creada para el proyecto.


Una vez conectado, se debe copiar y ejecutar todo el contenido del archivo `backup.txt`. Esto cargará los datos de prueba necesarios para utilizar y validar correctamente la aplicación.


Después de cargar el respaldo, podrás probar el sistema con usuarios, listas y tareas ya creadas.

### Usuario de prueba

| Campo | Valor |
|------|------|
| Nombre | Miguel |
| Correo | miguel@gmail.com |
| Contraseña | 123456 |

## HTTPS local

Para habilitar conexiones seguras durante el desarrollo se utilizó HTTPS tanto en el backend como en el frontend mediante certificados locales generados por `mkcert`.

La configuración fue realizada tomando como referencia un tutorial de HTTPS local.

### 1. Instalar mkcert

En Linux:

```bash
sudo apt install mkcert
```

### 2. Instalar la autoridad certificadora local

```bash
mkcert -install
```

Este comando registra una autoridad certificadora local en el sistema para que el navegador reconozca los certificados generados durante el desarrollo.

### 3. Generar certificados

Ubicarse dentro de la carpeta backend:

```bash
cd backend
```

Generar los certificados:

```bash
mkcert -key-file key.pem -cert-file cert.pem localhost
```

Esto generará los archivos:

- `backend/key.pem`
- `backend/cert.pem`

Estos archivos son utilizados por el servidor HTTPS local y no deben compartirse ni incluirse en el repositorio.

### 4. Configuración del backend

El servidor Express utiliza los certificados generados para crear un servidor HTTPS mediante el módulo nativo `https` de Node.js.

### 5. Configuración del frontend

Vite utiliza los mismos certificados para habilitar HTTPS durante el desarrollo local.

Una vez iniciados ambos servidores, la aplicación podrá accederse mediante:

- `https://localhost:5173`

y el backend mediante:

- `https://localhost:3000`

## Ejecución del proyecto

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

El backend se levanta con HTTPS en el puerto 3000.

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

## Endpoints principales

### Autenticación
- `POST /auth/register`
- `POST /auth/login`

### TodoLists
- `GET /todolists`

### Tasks
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

### Files
- `GET /files`
- `POST /files`

## Archivos que no deben incluirse en el repositorio

Por seguridad, estos archivos deben generarse localmente:

- `backend/.env`
- `backend/key.pem`
- `backend/cert.pem`

## Notas importantes

- Prisma se utiliza como ORM para trabajar con PostgreSQL.
- Supabase se utiliza como proveedor de base de datos.
- Cloudinary se utiliza para el almacenamiento de archivos.
- HTTPS en local se implementó con certificados generados por `mkcert`.
- El proyecto fue organizado para separar frontend y backend.

## Flujo general de la aplicación

1. El usuario inicia sesión.
2. El backend genera un JWT.
3. El frontend guarda el token.
4. El frontend solicita las TodoLists del usuario autenticado.
5. El usuario selecciona una TodoList.
6. Se muestran las Tasks de esa lista.
7. El usuario puede editar y crear tareas según los endpoints disponibles.

## Usuario de prueba

El proyecto incluye datos de prueba cargados en la base de datos mediante el archivo `backup.txt`.

Para facilitar la validación del sistema, se proporciona el siguiente usuario de ejemplo:

- **Correo:** `miguel@gmail.com`
- **Contraseña:** `123456`