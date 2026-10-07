# Progreso del proyecto

## Funciones

- La interfaz muestra el catálogo, filtra por título o autor y calcula el total de libros disponibles y no disponibles. [frontend/src/App.tsx](../frontend/src/App.tsx)
- Permite añadir libros con título, autor y año; al crear, el formulario envía `available: true`. [frontend/src/components/BookForm.tsx](../frontend/src/components/BookForm.tsx)
- Permite buscar un libro por ID, valida que sea entero y positivo, muestra carga y errores, y reutiliza la tarjeta de libro. [frontend/src/components/BookLookup.tsx](../frontend/src/components/BookLookup.tsx), [frontend/src/components/BookCard.tsx](../frontend/src/components/BookCard.tsx)
- El backend ofrece listar, consultar por ID y crear libros. La búsqueda por ID devuelve `404` si no existe; la creación responde `201`. [backend/app/routes/books.py](../backend/app/routes/books.py)
- En las verificaciones realizadas, `npm run build` y `npm run lint` pasaron. La API respondió `200` para un ID existente y `404` para uno inexistente.

## Limitaciones actuales

- Los libros se mantienen en una lista en memoria; no hay persistencia entre reinicios. [backend/app/services/book_service.py](../backend/app/services/book_service.py)
- No están implementadas operaciones para editar o borrar libros. [backend/app/routes/books.py](../backend/app/routes/books.py)
- El formulario de creación no captura los errores que puede lanzar el servicio ni muestra feedback ante un fallo. [frontend/src/components/BookForm.tsx](../frontend/src/components/BookForm.tsx), [frontend/src/services/books.ts](../frontend/src/services/books.ts)
- La carga inicial no tiene un estado visual separado del estado vacío. [frontend/src/App.tsx](../frontend/src/App.tsx)
- No se verificó una suite ni un comando de pruebas backend; el frontend tampoco define un script `test` en [frontend/package.json](../frontend/package.json).

## Próximos pasos sugeridos

- Capturar los fallos al crear libros y comunicarlos en la interfaz.
- Separar visualmente la carga inicial, el catálogo vacío y los errores de carga.
- Definir una herramienta de pruebas y añadir cobertura para listado, creación y búsqueda por ID, incluido el caso `404`.
- Si el producto requiere conservar los cambios tras reiniciar, diseñar e implementar persistencia.
- Implementar edición o borrado solo si se incorporan al alcance; implicaría actualizar API e interfaz.