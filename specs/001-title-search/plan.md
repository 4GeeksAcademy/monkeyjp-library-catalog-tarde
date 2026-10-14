# Plan técnico: búsqueda por título

## Cambios de backend
- Aceptar `title` como parámetro opcional en el listado y delegar el filtro al servicio de libros.
- Filtrar por coincidencia parcial sin distinguir mayúsculas; sin título, devolver todos los libros.

## Cambios de frontend
- Permitir que el servicio de libros consulte `GET /api/books?title=<string>`.
- Conectar la búsqueda del catálogo con la consulta y mostrar `No se encontraron libros` cuando no haya resultados.

## Archivos afectados
- `backend/app/routes/books.py`
- `backend/app/services/book_service.py`
- `frontend/src/services/books.ts`
- `frontend/src/App.tsx`

## Orden recomendado
1. Añadir el filtrado en el servicio backend y exponer el parámetro en la ruta.
2. Añadir el parámetro en el servicio frontend y conectar la búsqueda en `App`.
3. Verificar el comportamiento descrito en la spec.

## Verificación básica
- Ejecutar `npm run build` y `npm run lint` desde `frontend/`.
- Comprobar manualmente coincidencia parcial, diferencias de mayúsculas, búsqueda vacía y el mensaje exacto sin resultados.
- No hay un comando backend de pruebas verificado en el proyecto.
