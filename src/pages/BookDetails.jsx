import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Star, User, Calendar, BookOpen, ArrowLeft, Hash } from 'lucide-react';

// Book Details page: displays full info for a single book via dynamic route /books/:category/:id
const BookDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const book = useSelector((state) =>
    state.books.items.find((b) => b.id === Number(id))
  );

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Book Not Found</h2>
          <p className="text-slate-500 mb-6">The book you are looking for does not exist.</p>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg hover:bg-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  // Render star icons for the rating
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < full ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
      />
    ));
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/books" className="hover:text-amber-400 transition-colors">Browse Books</Link>
            <span>/</span>
            <Link to={`/books/${category}`} className="hover:text-amber-400 capitalize transition-colors">
              {category?.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-slate-200 truncate max-w-xs">{book.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </button>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Cover panel */}
            <div
              className="md:w-64 shrink-0 flex items-center justify-center py-16 px-8"
              style={{ backgroundColor: book.coverColor }}
            >
              <div className="text-center">
                <span className="text-white text-7xl font-extrabold opacity-30 block">
                  {book.title.charAt(0)}
                </span>
                <span className="text-white/70 text-xs mt-2 block capitalize">
                  {book.category.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-8">
              <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full capitalize mb-4">
                {book.category.replace('-', ' ')}
              </span>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2 leading-tight">
                {book.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <User className="w-4 h-4" />
                <span className="font-medium">{book.author}</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">{renderStars(book.rating)}</div>
                <span className="font-bold text-slate-700">{book.rating}</span>
                <span className="text-slate-400 text-sm">/ 5.0</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                {book.year && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-lg text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{book.year}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-lg text-sm text-slate-600">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <span>{book.pages} pages</span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-700 mb-2">About this book</h2>
                <p className="text-slate-600 leading-relaxed">{book.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-100">
                <Link
                  to={`/books/${book.category}`}
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Browse
                </Link>
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 font-medium px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  All Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetails;
