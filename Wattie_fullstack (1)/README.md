# Wattie — plataforma de lectura y escritura

Proyecto full-stack inspirado en plataformas de historias, con interfaz oscura y acentos rosados (sin ilustración de gato).

## Requisitos
- Node.js 18+
- MySQL 8+

## Preparar la base de datos
1. Inicia MySQL.
2. Ejecuta `backend/database/schema.sql` en MySQL Workbench o consola.
3. Copia `backend/.env.example` como `backend/.env` y configura las credenciales.

## Ejecutar
En una terminal:
```bash
cd backend
npm install
npm run dev
```
En otra terminal:
```bash
cd frontend
npm install
npm run dev
```
Abre la URL que indique Vite (normalmente http://localhost:5173).

## Incluye
- Frontend React + Vite: inicio, explorar, biblioteca, detalle de historia, lectura y editor.
- Backend Node.js + Express: API REST, registro/login JWT, historias, capítulos, favoritos y comentarios.
- MySQL: esquema relacional y datos demo opcionales.
- Password hashing con bcrypt y middleware JWT.

Las credenciales se guardan únicamente en `.env` local; nunca subas ese archivo al repositorio.
