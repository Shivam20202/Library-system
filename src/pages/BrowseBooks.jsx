import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';
import { CATEGORIES } from '../data/books';
import BookCard from '../components/BookCard';

// Browse Books page: filterable and searchable book listing with dynamic category routing
const BrowseBooks = () => {
  const { category } = useParams();
  const books = useSelector((state) => state.books.items);
  const [search, setSearch] = useState('');

  // Filter books by selected category and search query
  const filteredBooks = useMemo(() => {
    let result = books;
    if (category) {
      result = result.filter((b) => b.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [books, category, search]);

  const activeCategoryLabel = category
    ? CATEGORIES.find((c) => c.id === category)?.label ?? category
    : 'All Books';

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-slate-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-200">Browse Books</span>
            {category && (
              <>
                <span>/</span>
                <span className="text-amber-400 capitalize">{activeCategoryLabel}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold">
            {activeCategoryLabel}
            <span className="ml-3 text-lg font-normal text-slate-400">
              ({filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: category filters */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-700 text-sm">Categories</span>
              </div>
              <nav className="p-2">
                <Link
                  to="/books"
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !category
                      ? 'bg-amber-400 text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  All Books
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/books/${cat.id}`}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      category === cat.id
                        ? 'bg-amber-400 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content: search + book grid */}
          <div className="flex-1">
            {/* Search bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Book cards grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-slate-100">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No books found</p>
                <p className="text-slate-400 text-sm mt-1">Try a different search or category</p>
                <Link
                  to="/books"
                  className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Clear filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrowseBooks;
