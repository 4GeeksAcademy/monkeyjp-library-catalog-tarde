## Backend
- [x] T1 -- Añadir filtrado parcial de libros por título, sin distinguir mayúsculas, en el servicio backend; devolver todos cuando no haya título.
- [x] T2 -- Aceptar el parámetro opcional `title` en la ruta `GET /api/books` y pasarlo al servicio.

## Frontend
- [x] T3 -- Actualizar el servicio frontend para enviar el texto de búsqueda como `title` a `GET /api/books`.
- [x] T4 -- Conectar la búsqueda del catálogo a la consulta y mostrar exactamente `No se encontraron libros` cuando no haya resultados.

## Verificación
- [x] T5 -- Ejecutar `npm run build` y `npm run lint` desde `frontend/`.
- [x] T6 -- Verificar los criterios de aceptación de `spec.md`: coincidencia parcial e insensible a mayúsculas, consulta con `title`, campo vacío y mensaje exacto sin resultados.
