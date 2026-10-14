# Reglas de frontend

## Objetivo

Mantener la interfaz del catálogo organizada alrededor del contrato y los servicios existentes, con errores de usuario manejados explícitamente.

## Justificación

Las peticiones están centralizadas en `frontend/src/services/books.ts`. `frontend/src/App.tsx` posee el estado de la colección y `frontend/src/components/BookForm.tsx` notifica altas mediante `onCreated`. El servicio lanza un error ante respuestas HTTP fallidas, pero el formulario actualmente no captura el error de `createBook`.

## Reglas

- Centraliza las llamadas HTTP en `frontend/src/services/`; comprueba `response.ok` antes de devolver el JSON.
- Mantén el estado de la colección en `App` y comunica las altas desde el formulario mediante `onCreated`.
- Captura los errores de envío y muestra feedback al usuario; no dejes rechazos sin manejar.
- Conserva el contrato `Book` definido en `frontend/src/types/book.ts` y coordina sus cambios con el modelo backend.

## Ejemplo correcto

El servicio comprueba la respuesta HTTP; `App` actualiza la colección a partir del callback del formulario:

```ts
// frontend/src/services/books.ts
if (!response.ok) {
  throw new Error("Could not create book");
}
return response.json();
```

```tsx
// frontend/src/App.tsx
<BookForm
  onCreated={(book) => setBooks((current) => [...current, book])}
/>
```

Al gestionar el envío, captura el error que puede lanzar el servicio:

```tsx
try {
  const created = await createBook({ title, author, year, available: true });
  onCreated(created);
} catch {
  setError("Could not create book");
}
```

## Ejemplo incorrecto

No hagas la petición directamente en el componente ni ignores los errores HTTP:

```tsx
// Evitar en App o BookForm
const response = await fetch("/api/books", {
  method: "POST",
  body: JSON.stringify(book),
});
const created = await response.json();
```

Esto evita el servicio compartido, no comprueba `response.ok` y no maneja un fallo de la petición, a diferencia del patrón de `frontend/src/services/books.ts`.