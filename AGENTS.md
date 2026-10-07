# AGENTS.md

## proyecto

Aplicación sencilla para gestionar un catálogo de biblioteca.

## stack y estructura

- `frontend/`: interfaz React con TypeScript y Vite. Las peticiones a la API están en `src/services/`; los tipos compartidos del frontend están en `src/types/`.
- `backend/`: API FastAPI en Python. `app/routes/` define rutas, `app/services/` contiene lógica de libros y `app/models/` define modelos Pydantic.
- `docker-compose.yml` configura los servicios frontend y backend.
- `memory-bank/`: documentación del producto (`product.md`), contexto técnico (`techContext.md`) y estado, limitaciones y próximos pasos (`progress.md`).

## comandos

- Desde la raíz, `docker compose up --build` construye e inicia ambos servicios; es el comando documentado en `README.md`.
- Desde `frontend/`, `npm run build` ejecuta el chequeo TypeScript y compila Vite; `npm run lint` ejecuta ESLint. Son scripts definidos en `frontend/package.json`.
- No hay un comando de pruebas backend verificado en este proyecto. No inventes comandos ni afirmes que build, lint o tests pasaron sin ejecutarlos.

## convenciones

- Centraliza las llamadas HTTP del frontend en `frontend/src/services/` y comprueba `response.ok` antes de usar la respuesta.
- `App` mantiene el estado del catálogo; los componentes de formulario notifican cambios mediante callbacks como `onCreated`.
- Captura errores de envío en la interfaz y comunica el fallo al usuario. Actualmente `BookForm` no captura errores de `createBook`; no conserves esa omisión al modificar el flujo.
- Mantén las rutas backend enfocadas en HTTP y delega operaciones de datos a `app/services/`.
- Usa modelos Pydantic para validar entradas y declarar respuestas; conserva códigos HTTP adecuados, como `201` para creación.

## reglas de dominio

- El libro usa los campos `id` (entero), `title` (texto), `author` (texto), `year` (entero) y `available` (booleano). El backend requiere título y autor no vacíos, requiere año y usa `true` como valor predeterminado de `available` al crear.
- Mantén alineados el tipo `Book` en `frontend/src/types/book.ts` y los modelos de `backend/app/models/book.py` cuando cambie el contrato.
- Las rutas actuales permiten listar libros (`GET /api/books`), consultar por ID (`GET /api/books/{book_id}`) y crear (`POST /api/books`). La creación responde `201`.
- Los libros se guardan actualmente en la lista `BOOKS` en memoria; no asumas persistencia entre reinicios.
- No hay rutas actuales para editar o borrar libros. Si se incorporan esas operaciones, actualiza tanto API como interfaz.

## forma de trabajar

- Antes de modificar el frontend, lee `.agents/rules/frontend.md`; antes de modificar el backend, lee `.agents/rules/backend.md`. Si el cambio afecta ambas capas, lee las dos reglas.
- Si cambias una ruta, host o puerto de API, revisa conjuntamente el cliente en `frontend/src/services/books.ts`, el montaje de rutas en `backend/app/main.py`, el proxy de `frontend/vite.config.ts` y la configuración de `docker-compose.yml`.
- Al cambiar una operación de libro, revisa el recorrido completo: componente, servicio frontend, ruta backend, modelo y servicio backend.
- Después de cada nueva implementación o cambio importante en el código, actualiza los documentos afectados de `memory-bank/` para que describan el estado real del proyecto. Mantén `product.md` y `techContext.md` alineados con las funciones y la arquitectura actuales, y actualiza `progress.md` con funciones, limitaciones y próximos pasos. Distingue hechos comprobados de sugerencias; no conserves afirmaciones que hayan quedado obsoletas.

## límites

- No describas la lista en memoria como almacenamiento persistente ni afirmes que existen operaciones de edición o borrado.
- No supongas una base de datos, suite de tests, comando backend de pruebas ni flujo de ramas o commits: no están establecidos por las verificaciones disponibles.
- Distingue entre scripts definidos y verificaciones ejecutadas; informa con precisión qué comandos se corrieron y su resultado.

## verificación

- Para frontend están definidos `npm run build` y `npm run lint` desde `frontend/`; ejecútalos para cambios en esa parte y reporta el resultado real.
- `docker compose up --build` está documentado para levantar la aplicación desde la raíz. Esto comprueba el arranque, no sustituye pruebas automatizadas.
- No se verificó una suite ni un comando de pruebas backend; no afirmes cobertura de tests sin comprobarla.