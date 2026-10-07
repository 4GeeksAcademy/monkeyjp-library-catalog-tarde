import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { getBookById } from "../services/books";
import type { Book } from "../types/book";
import BookCard from "./BookCard";

export default function BookLookup() {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = Number(bookId);
    if (!Number.isInteger(id) || id < 1) {
      setBook(null);
      setError("Enter a valid book ID");
      return;
    }

    setIsLoading(true);
    setError("");
    setBook(null);

    try {
      setBook(await getBookById(id));
    } catch (lookupError) {
      setError(
        lookupError instanceof Error ? lookupError.message : "Could not load book"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Find a book by ID</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          min="1"
          step="1"
          value={bookId}
          onChange={(event) => setBookId(event.target.value)}
          placeholder="Book ID"
          aria-label="Book ID"
          required
          className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={18} />
          {isLoading ? "Searching..." : "Find book"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </p>
      )}

      {book && (
        <div className="mt-5">
          <p className="mb-3 text-sm font-medium text-slate-600">
            Book ID: {book.id}
          </p>
          <BookCard book={book} />
        </div>
      )}
    </section>
  );
}