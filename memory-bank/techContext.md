# Contexto técnico

## Stack

- **Frontend:** React y TypeScript; Vite sirve la aplicación y configura el proxy de desarrollo. Referencias: [frontend/package.json](../frontend/package.json), [frontend/vite.config.ts](../frontend/vite.config.ts).
- **Backend:** Python con FastAPI y modelos Pydantic. Referencias: [backend/requirements.txt](../backend/requirements.txt), [backend/app/main.py](../backend/app/main.py), [backend/app/models/book.py](../backend/app/models/book.py).

## Estructura

- `frontend/src/components/`: componentes de interfaz.
- `frontend/src/services/`: llamadas HTTP centralizadas.
- `frontend/src/types/`: tipos compartidos, incluido `Book`.
- `backend/app/routes/`: endpoints HTTP.
- `backend/app/services/`: operaciones de libros.
- `backend/app/models/`: modelos de entrada y respuesta.
- `docker-compose.yml`: configuración de los servicios y publicación de los puertos `5173` y `8000`.

Referencias: [frontend/src/App.tsx](../frontend/src/App.tsx), [frontend/src/services/books.ts](../frontend/src/services/books.ts), [frontend/src/types/book.ts](../frontend/src/types/book.ts), [backend/app/routes/books.py](../backend/app/routes/books.py), [backend/app/services/book_service.py](../backend/app/services/book_service.py), [backend/app/models/book.py](../backend/app/models/book.py), [docker-compose.yml](../docker-compose.yml).

## Comandos definidos

- Desde la raíz, `docker compose up --build` construye e inicia frontend y backend. Está documentado en [README.md](../README.md).
- Desde `frontend/`, `npm run build` ejecuta el chequeo TypeScript y compila Vite; `npm run lint` ejecuta ESLint. Están definidos en [frontend/package.json](../frontend/package.json).

La presencia de estos comandos no implica que se hayan ejecutado o que hayan pasado.

## Comunicación frontend-backend

- El frontend usa `fetch` para llamar a `GET /api/books` o `GET /api/books?title=<string>`, `GET /api/books/{id}` y `POST /api/books`. El parámetro `title` filtra por coincidencia parcial sin distinguir mayúsculas; al omitirlo o dejarlo vacío se listan todos los libros. Las funciones están en [frontend/src/services/books.ts](../frontend/src/services/books.ts).
- FastAPI monta las rutas de libros bajo `/api`; la ruta por ID responde `404` si no encuentra el libro. Referencias: [backend/app/main.py](../backend/app/main.py), [backend/app/routes/books.py](../backend/app/routes/books.py).
- Vite reenvía las peticiones `/api` a `http://host.docker.internal:8000`. Compose configura ese host para el contenedor frontend. Referencias: [frontend/vite.config.ts](../frontend/vite.config.ts), [docker-compose.yml](../docker-compose.yml).