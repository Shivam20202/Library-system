import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, BookOpen, AlertCircle } from 'lucide-react';
import { addBook } from '../store/booksSlice';
import { CATEGORIES } from '../data/books';

const COVER_COLORS = [
  '#1e3a5f', '#8b4513', '#2d5a27', '#1a1a2e',
  '#4a4a4a', '#5c3317', '#8b0000', '#c04000',
  '#2f4f4f', '#556b2f', '#2e8b57', '#b8860b',
];

const EMPTY_FORM = {
  title: '',
  author: '',
  category: '',
  rating: '',
  description: '',
  year: '',
  pages: '',
  coverColor: COVER_COLORS[0],
};

// Add Book page with form validation and Redux dispatch
const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate all required fields; return error map
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.author.trim()) errs.author = 'Author is required.';
    if (!form.category) errs.category = 'Category is required.';
    if (!form.rating) {
      errs.rating = 'Rating is required.';
    } else if (Number(form.rating) < 1 || Number(form.rating) > 5) {
      errs.rating = 'Rating must be between 1 and 5.';
    }
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (form.year && (Number(form.year) < 1000 || Number(form.year) > new Date().getFullYear())) {
      errs.year = `Year must be between 1000 and ${new Date().getFullYear()}.`;
    }
    if (form.pages && Number(form.pages) < 1) {
      errs.pages = 'Pages must be a positive number.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSubmitted(true);
      return;
    }
    // Dispatch addBook action — new book is prepended to the list
    dispatch(
      addBook({
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category,
        rating: parseFloat(Number(form.rating).toFixed(1)),
        description: form.description.trim(),
        year: form.year ? Number(form.year) : null,
        pages: form.pages ? Number(form.pages) : null,
        coverColor: form.coverColor,
      })
    );
    navigate('/books');
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-slate-200 focus:ring-amber-300 focus:border-amber-400'
    }`;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-200">Add Book</span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <PlusCircle className="w-7 h-7 text-amber-400" />
            Add a New Book
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {submitted && Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>Please fix the errors below before submitting.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. The Great Gatsby" className={inputClass('title')} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input type="text" name="author" value={form.author} onChange={handleChange}
              placeholder="e.g. F. Scott Fitzgerald" className={inputClass('author')} />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass('category')}>
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Rating, Year, Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Rating (1–5) <span className="text-red-500">*</span>
              </label>
              <input type="number" name="rating" value={form.rating} onChange={handleChange}
                min="1" max="5" step="0.1" placeholder="e.g. 4.5" className={inputClass('rating')} />
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Year <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input type="number" name="year" value={form.year} onChange={handleChange}
                placeholder="e.g. 2023" className={inputClass('year')} />
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Pages <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input type="number" name="pages" value={form.pages} onChange={handleChange}
                placeholder="e.g. 350" className={inputClass('pages')} />
              {errors.pages && <p className="text-red-500 text-xs mt-1">{errors.pages}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={4} placeholder="Write a brief description of the book..."
              className={inputClass('description') + ' resize-none'} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Cover color picker */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Color</label>
            <div className="flex flex-wrap gap-2">
              {COVER_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, coverColor: color }))}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    form.coverColor === color ? 'scale-125 ring-2 ring-offset-2 ring-amber-400' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Preview</p>
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-20 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: form.coverColor }}
              >
                <span className="text-white text-2xl font-bold opacity-40">
                  {form.title ? form.title.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">
                  {form.title || <span className="text-slate-400 font-normal italic">Book Title</span>}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {form.author || <span className="italic">Author name</span>}
                </p>
                {form.rating && <p className="text-amber-500 text-xs mt-1 font-semibold">★ {form.rating}</p>}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-amber-400 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-300 transition-colors shadow"
            >
              <BookOpen className="w-5 h-5" />
              Add to Library
            </button>
            <Link
              to="/books"
              className="flex-1 flex items-center justify-center border border-slate-200 text-slate-600 font-medium py-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddBook;
