
# Frontend CNW - Setup Inicial

Este documento describe los pasos necesarios para instalar y ejecutar el frontend del proyecto CNW.

---

## 🧰 Requisitos

- [Node.js (versión recomendada: 18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## ⚙️ Instalación

### 1. Clonar el proyecto

```bash
git clone https://github.com/AndreCeron/Desarrollo
cd /Desarrollo
cd /frontend
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

Todas las librerías necesarias están ya incluidas en el archivo `package.json`.

---

## 🚀 Ejecutar el proyecto

### Configurar variables de entorno

Crea un archivo `.env.development` en la raíz de la carpeta backend con el siguiente contenido:

```env
VITE_API_URL=http://localhost:8083
```

> 🔐 El puerto en uso debe coincidir con el puerto configurado para el Backend. 

---

### Instalar dependencias
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en:

```
http://localhost:8082
```

(o el puerto que hayas configurado en tu entorno en el archivo vite.config.js)

---

## 🧪 Comprobación rápida

- [ ] Node.js está instalado correctamente
- [ ] Se ejecutó `npm install` sin errores
- [ ] Puedes acceder al frontend en `http://localhost:8082`

---

## 🆘 Soporte

Si encuentras errores:

- Verifica que tienes la versión correcta de Node.js
- Asegúrate de estar dentro del directorio correcto
- Asegúrate de haber ejecutado `npm install` antes de `npm run dev`
- o Comunicate al correo ing.desarrollo@cnw.co

---
