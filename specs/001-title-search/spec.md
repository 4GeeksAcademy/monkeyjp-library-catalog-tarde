# Búsqueda por título

## Objetivo
Permitir encontrar libros del catálogo mediante una búsqueda por título.

## Usuario
Usuario que consulta el catálogo y necesita localizar libros por su título.

## Historia de usuario
Como usuario del catálogo, quiero buscar libros por título para encontrar los libros que coinciden con el texto consultado.

## Requisitos funcionales
- La búsqueda encuentra coincidencias parciales en el título del libro.
- La búsqueda no distingue entre mayúsculas y minúsculas.
- Con el campo de búsqueda vacío se muestran todos los libros.
- La búsqueda utiliza `GET /api/books?title=<string>`.
- Si no hay resultados, se muestra exactamente: `No se encontraron libros`.

## Criterios de aceptación
1. Al buscar un fragmento que aparece en un título, se muestran los libros cuyo título contiene ese fragmento.
2. Una coincidencia en el título se encuentra aunque el texto buscado y el título tengan distintas mayúsculas o minúsculas.
3. La búsqueda se realiza mediante `GET /api/books?title=<string>` con el texto consultado.
4. Al dejar vacío el campo de búsqueda, se muestran todos los libros.
5. Si ningún título coincide con la búsqueda, se muestra exactamente `No se encontraron libros`.

## Fuera de alcance
- Buscar libros por autor u otros campos.
