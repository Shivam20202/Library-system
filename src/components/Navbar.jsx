import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';

// Top navigation bar with responsive mobile menu
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'Browse Books' },
    { to: '/add', label: 'Add Book' },
  ];

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:text-amber-400 transition-colors">
            <BookOpen className="w-7 h-7 text-amber-400" />
            <span>LibraryHub</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-400 text-slate-900'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 flex flex-col gap-2">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-slate-900'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
