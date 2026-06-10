import { Link } from 'react-router-dom';
import { Star, User, Calendar } from 'lucide-react';

// Reusable card component for displaying a book preview
const BookCard = ({ book }) => {
  // Handle missing book data
  if (!book || !book.title) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Color-coded book cover */}
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: book.coverColor || '#6b7280' }}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        <span className="text-white text-4xl font-bold opacity-30 select-none">
          {book.title.charAt(0)}
        </span>
        {/* Category badge */}
        <span className="absolute top-3 right-3 bg-white/90 text-slate-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">
          {book.category.replace('-', ' ')}
        </span>
      </div>

      {/* Book info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 mb-1 group-hover:text-amber-600 transition-colors">
          {book.title}
        </h3>

        <div className="flex items-center gap-1 text-slate-500 text-sm mb-2">
          <User className="w-3.5 h-3.5" />
          <span className="truncate">{book.author}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          {/* Star rating */}
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-slate-700">{book.rating}</span>
          </div>

          {book.year && (
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Calendar className="w-3 h-3" />
              <span>{book.year}</span>
            </div>
          )}

          {/* View details link */}
          <Link
            to={`/books/${book.category}/${book.id}`}
            className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
