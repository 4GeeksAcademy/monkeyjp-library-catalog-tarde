# Producto

## Resumen

Aplicación web para gestionar un catálogo de biblioteca. Permite consultar la colección, filtrar libros por coincidencia parcial en el título sin distinguir mayúsculas, buscar un libro por ID y añadir libros. La interfaz muestra el total de libros y cuántos están disponibles o no disponibles.

Cada libro contiene `id`, `title`, `author`, `year` y `available`. Al crear un libro, `available` es `true` si no se especifica otro valor.

## Alcance actual

- La API permite listar libros o filtrarlos por título, consultar un libro por ID y crear libros.
- Los libros se mantienen en una lista en memoria; no se debe asumir persistencia entre reinicios.
- No hay operaciones implementadas para editar o borrar libros.

## Referencias

- Interfaz y filtros: [frontend/src/App.tsx](../frontend/src/App.tsx)
- Búsqueda por ID: [frontend/src/components/BookLookup.tsx](../frontend/src/components/BookLookup.tsx)
- Creación de libros: [frontend/src/components/BookForm.tsx](../frontend/src/components/BookForm.tsx)
- Contrato y validación: [frontend/src/types/book.ts](../frontend/src/types/book.ts), [backend/app/models/book.py](../backend/app/models/book.py)
- Operaciones API: [backend/app/routes/books.py](../backend/app/routes/books.py)
- Almacenamiento actual: [backend/app/services/book_service.py](../backend/app/services/book_service.py)

El código revisado no especifica un público objetivo ni establece funciones de préstamo o devolución.