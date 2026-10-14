# Reglas de backend

## Objetivo

Mantener la API del catálogo validada y coherente, separando el transporte HTTP de las operaciones sobre libros.

## Justificación

`backend/app/routes/books.py` define las rutas y delega las operaciones a `backend/app/services/book_service.py`. `backend/app/models/book.py` declara los modelos Pydantic; la creación devuelve `201`. El servicio actualiza la lista `BOOKS` en memoria.

## Reglas

- Mantén las rutas en `app/routes/` enfocadas en HTTP y delega la lógica de libros a `app/services/`.
- Usa modelos Pydantic para validar entradas y declarar respuestas.
- Conserva códigos HTTP explícitos y adecuados; la creación de libros responde `201`.
- Mantén los modelos backend alineados con `frontend/src/types/book.ts` cuando cambie el contrato.
- No supongas persistencia: actualmente el servicio modifica la lista `BOOKS` en memoria.

## Ejemplo correcto

La ruta declara el modelo de entrada y respuesta, el código de creación y delega al servicio, como en `backend/app/routes/books.py`:

```py
@router.post("", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(payload: BookCreate):
    return add_book(payload)
```

La operación de datos vive en `backend/app/services/book_service.py`:

```py
def add_book(data: BookCreate):
    next_id = max((book["id"] for book in BOOKS), default=0) + 1
    book = {"id": next_id, **data.model_dump()}
    BOOKS.append(book)
    return book
```

## Ejemplo incorrecto

No aceptes un diccionario sin validar ni modifiques `BOOKS` directamente desde la ruta:

```py
@router.post("")
def create_book(payload: dict):
    BOOKS.append(payload)
    return payload
```

Esto omite los modelos Pydantic, el modelo de respuesta, el estado `201` y la delegación al servicio, a diferencia del patrón real en `backend/app/routes/books.py`.