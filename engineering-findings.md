# Engineering Findings

Reglas derivadas de la revisión del código actual.

## Frontend

### Arquitectura
- **Hallazgo:** las peticiones HTTP están separadas de los componentes. **Regla:** centralizar nuevas llamadas a la API en el servicio correspondiente y consumirlas desde los componentes. Evidencia: [frontend/src/services/books.ts](frontend/src/services/books.ts).
- **Hallazgo:** `App` posee el estado de la lista y `BookForm` notifica la creación con `onCreated`. **Regla:** mantener una única fuente de estado para el catálogo y comunicar cambios entre componentes mediante props/callbacks. Evidencia: [frontend/src/App.tsx](frontend/src/App.tsx), [frontend/src/components/BookForm.tsx](frontend/src/components/BookForm.tsx).

### Manejo de errores
- **Hallazgo:** el servicio rechaza respuestas HTTP fallidas, pero `BookForm` no captura el error de `createBook`. **Regla:** capturar errores de envío y mostrar feedback al usuario; no dejar promesas rechazadas sin manejar. Evidencia: [frontend/src/services/books.ts](frontend/src/services/books.ts), [frontend/src/components/BookForm.tsx](frontend/src/components/BookForm.tsx).

## Backend

### Arquitectura
- **Hallazgo:** las rutas delegan las operaciones de libros al servicio. **Regla:** mantener el código HTTP en las rutas y la lógica de datos en la capa de servicio. Evidencia: [backend/app/routes/books.py](backend/app/routes/books.py), [backend/app/services/book_service.py](backend/app/services/book_service.py).

### Validación de API
- **Hallazgo:** Pydantic define la entrada y respuesta del libro; la creación responde `201`. **Regla:** validar payloads con modelos y conservar códigos HTTP coherentes al añadir o cambiar endpoints. Evidencia: [backend/app/models/book.py](backend/app/models/book.py), [backend/app/routes/books.py](backend/app/routes/books.py).

### Persistencia y alcance
- **Hallazgo:** el servicio modifica la lista `BOOKS` en memoria; las rutas actuales permiten listar, consultar por ID y crear, pero no editar ni borrar. **Regla:** no asumir persistencia entre reinicios; si se agregan operaciones o una base de datos, actualizar explícitamente el servicio, las rutas y los consumidores. Evidencia: [backend/app/services/book_service.py](backend/app/services/book_service.py), [backend/app/routes/books.py](backend/app/routes/books.py).

## Integración

### Contrato API
- **Hallazgo:** el tipo `Book` está representado tanto en TypeScript como en Pydantic. **Regla:** cambiar ambos lados de forma coordinada y mantener iguales los nombres, tipos y requisitos de los campos. Evidencia: [frontend/src/types/book.ts](frontend/src/types/book.ts), [backend/app/models/book.py](backend/app/models/book.py), [frontend/src/services/books.ts](frontend/src/services/books.ts).

### DX y configuración
- **Hallazgo:** el frontend solicita `/api/books`; FastAPI agrega el prefijo `/api`, Vite reenvía `/api` al backend en el puerto `8000`, y Compose aporta `host.docker.internal`. **Regla:** al cambiar rutas, host o puertos, revisar y actualizar juntos el cliente, el montaje de rutas, el proxy y Compose. Evidencia: [frontend/src/services/books.ts](frontend/src/services/books.ts), [frontend/vite.config.ts](frontend/vite.config.ts), [backend/app/main.py](backend/app/main.py), [backend/app/routes/books.py](backend/app/routes/books.py), [docker-compose.yml](docker-compose.yml).