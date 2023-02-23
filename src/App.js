import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";
import Navbar from "./components/Navbar";
import Book from "./pages/Book";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list/:listId" element={<List />} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
