# Verificaciones del proyecto

| Afirmación original | Archivos revisados | Resultado | Corrección si fue necesaria |
|---|---|---|---|
| El catálogo permite listar y crear libros, pero no editarlos ni borrarlos. | `backend/app/routes/books.py`, `frontend/src/App.tsx` | Confirmada | No necesaria. |
| Los libros añadidos se guardan en memoria y no en una base de datos. | `backend/app/services/book_service.py`, `backend/requirements.txt` | Confirmada | No necesaria. |
| La búsqueda por título y autor se realiza en el frontend. | `frontend/src/App.tsx`, `backend/app/routes/books.py` | Confirmada | No necesaria. |
| El frontend solicita `/api/books` y Vite reenvía esa ruta al backend. | `frontend/src/services/books.ts`, `frontend/vite.config.ts` | Confirmada | No necesaria. |
| Al crear un libro, el backend requiere título, autor y año; `available` tiene un valor predeterminado. | `backend/app/models/book.py`, `backend/app/routes/books.py` | Confirmada | No necesaria. |