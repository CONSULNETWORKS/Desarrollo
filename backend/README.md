
# Backend CNW - Setup Inicial

Este documento describe los pasos necesarios para instalar y configurar el entorno inicial del proyecto, incluyendo la base de datos PostgreSQL y el entorno de desarrollo con Node.js.

---

## 🧰 Requisitos

- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js (versión recomendada: v22.16.0+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## ⚙️ Paso a Paso de Instalación

### 1. Instalar PostgreSQL

Si no tienes PostgreSQL instalado, puedes descargarlo desde:

👉 [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Durante la instalación, usa las siguientes credenciales:

- Usuario: `postgres`
- Contraseña: (cambia la contraseña en el archivo .env, usaremos por defecto `prueba1234`)
> ⚠️ Asegúrate de cambiar esta contraseña. Y usarla en el momento de instalar postgresql, la necesitarás en la configuración del entorno.
---

### 2. Crear la Base de Datos

Una vez instalado PostgreSQL, crea la base de datos llamada `cnw`.

#### Opción A: Usando psql (CLI)

```bash
psql -U postgres
```

Dentro del prompt interactivo:

```sql
CREATE DATABASE "cnw";
\q
```

#### Opción B: Usando PgAdmin

1. Abre PgAdmin.
2. Conéctate al servidor usando el usuario `postgres`.
3. Usa la contraseña del primer paso. 
3. Haz clic derecho en `Databases > Create > Database`.
4. Nombre: `cnw`
5. Guarda.

---

### 3. Instalar Node.js

Descarga e instala Node.js desde:

👉 [https://nodejs.org/](https://nodejs.org/)

Verifica la instalación con:

```bash
node -v
npm -v
```

---

### 4. Asegurate de haber clonado el proyecto

```bash
git clone https://github.com/CONSULNETWORKS/Desarrollo.git
cd /Desarrollo
cd /backend
```

---

### 5. Instalar dependencias

```bash
npm install
# o
yarn install
```

---

### 6. Configurar variables de entorno

Crea un archivo `.env` en la raíz de la carpeta backend con el siguiente contenido:

```env
HOST=localhost
USER=postgres
PASSWORD="prueba1234"
DB=cnw-prueba
DIALECT=postgres
POOL_MAX=5
POOL_MIN=0
POOL_ACQUIRE=30000
POOL_IDLE=10000

SPEAKEASY_SECRET='YOUR_SUPER_SECRET_BASE32_KEY'

VITE_API_URL=http://localhost:8083
```

> 🔐 Reemplaza `YOUR_SUPER_SECRET_BASE32_KEY` con una clave secreta en formato Base32. Puedes generarla usando la librería `speakeasy`.

---

### 7. Iniciar el servidor

```bash
node server.js
```

---

### 8. Verificar conexión

Abre tu navegador y visita:

```
http://localhost:8083
```

Asegúrate de que el backend esté corriendo sin errores.

---

## 🧪 Comprobación rápida

- [ ] PostgreSQL está corriendo y tiene la base `cnw`
- [ ] El archivo `.env` está configurado correctamente
- [ ] El servidor arranca sin errores
- [ ] Puedes acceder a `http://localhost:8083`

---

## 🆘 Soporte

Si encuentras errores, verifica:

- Conexión a la base de datos (usuario, contraseña, nombre de la base)
- Que PostgreSQL esté corriendo
- Que `.env` no tenga errores de sintaxis
- Que tengas Node.js y npm/yarn correctamente instalados
- O comunicate al correo ing.desarrollo@cnw.co

---
