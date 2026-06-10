import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/books';
import BookCard from '../components/BookCard';

// Home page: landing page with welcome banner, categories, and popular books
const Home = () => {
  const books = useSelector((state) => state.books.items);
  const popularBooks = books.filter((b) => b.popular);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <span className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4" />
              Your Digital Reading Companion
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-amber-400">LibraryHub</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of books across every genre. Explore, read, and build your
            personal reading list — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              Browse Books
            </Link>
            <Link
              to="/add"
              className="inline-flex items-center gap-2 border border-slate-500 text-slate-200 font-medium px-8 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Add a Book
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Browse by Category</h2>
          <p className="text-slate-500 mb-8">Explore books across all genres</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/books/${cat.id}`}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md border border-slate-100 hover:border-amber-300 hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-slate-700 group-hover:text-amber-600 transition-colors text-sm">
                  {cat.label}
                </div>
                <div className="text-xs text-slate-400 mt-1 leading-tight">{cat.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Popular Books</h2>
              <p className="text-slate-500 mt-1">Highly rated picks loved by readers</p>
            </div>
            <Link
              to="/books"
              className="hidden sm:flex items-center gap-1 text-amber-600 font-medium hover:text-amber-700 text-sm"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
