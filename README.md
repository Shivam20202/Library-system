# LibraryHub - Online Library System

A fully-featured online library system built with **React**, **Vite**, **Tailwind CSS**, **Redux Toolkit**, and **React Router DOM**.

---

## Features

- **Home Page** — Welcome banner, 6-category grid, and popular books displayed as cards
- **Browse Books** — Category sidebar filter (`/books/:category`), live search by title or author
- **Book Details** — Full detail view (`/books/:category/:id`) with rating, description, year, and pages
- **Add Book** — Form with full validation; new book is prepended to the list and shown first on Browse
- **404 Page** — Custom Not Found page (no navbar) that displays the invalid URL, with a link back to Home

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [React 18](https://react.dev/) | UI library |
| [React Router DOM v6](https://reactrouter.com/) | Client-side routing |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd library-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot module replacement |
| `npm run build` | Build for production (output goes to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Project Structure

```
library-hub/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky responsive navigation bar
│   │   └── BookCard.jsx      # Reusable book preview card
│   ├── data/
│   │   └── books.js          # Dummy book data and category list
│   ├── pages/
│   │   ├── Home.jsx          # Landing page with hero, categories, popular books
│   │   ├── BrowseBooks.jsx   # Browse/filter/search page
│   │   ├── BookDetails.jsx   # Single book detail view
│   │   ├── AddBook.jsx       # Add new book form
│   │   └── NotFound.jsx      # 404 page (no header)
│   ├── store/
│   │   ├── store.js          # Redux store configuration
│   │   └── booksSlice.js     # Books state slice with addBook action
│   ├── App.jsx               # Router + Provider setup
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind CSS directives
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/books` | Browse Books | All books with search |
| `/books/:category` | Browse Books | Filtered by category |
| `/books/:category/:id` | Book Details | Single book detail |
| `/add` | Add Book | Add a new book |
| `*` | 404 Not Found | Invalid route handler |

---

## State Management

Books are managed in a Redux slice (`src/store/booksSlice.js`). The `addBook` action prepends the new book to the list so it always appears first on the Browse Books page after submission.

---

## Form Validation (Add Book)

The Add Book form validates the following before submission:

- **Title** — required
- **Author** — required
- **Category** — must select one
- **Rating** — required, must be between 1.0 and 5.0
- **Description** — required
- **Year** — optional, but must be between 1000 and current year if provided
- **Pages** — optional, but must be a positive number if provided

Errors appear inline beneath each field. A summary banner is shown at the top if the form is submitted with errors.
