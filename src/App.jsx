import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import NotFound from './pages/NotFound';

// Root application component: sets up Redux Provider and React Router routes
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* 404 — no Navbar */}
          <Route path="*" element={<NotFound />} />

          {/* All pages with Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/books" element={<><Navbar /><BrowseBooks /></>} />
          <Route path="/books/:category" element={<><Navbar /><BrowseBooks /></>} />
          <Route path="/books/:category/:id" element={<><Navbar /><BookDetails /></>} />
          <Route path="/add" element={<><Navbar /><AddBook /></>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
