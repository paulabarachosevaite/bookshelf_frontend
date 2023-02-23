import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getList, addBook, deleteList} from "../features/lists/listSlice";
import {createBook, reset} from "../features/book/bookSlice";
import {AiFillCloseCircle} from "react-icons/ai";
import axios from "axios";
import BookComponent from "../components/BookComponent";

function List() {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    genre: "",
    bookId: "",
  });

  const [search, setSearch] = useState({
    searchTitle: "",
    searchAuthor: "",
  });
  const {lists, isLoading} = useSelector((state) => state.lists);
  const {user} = useSelector((state) => state.auth);
  const {book} = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {listId} = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (book) {
      dispatch(addBook({bookId: book._id, listId}));
    }
    dispatch(getList(listId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, book, listId]);

  const onChange = (e) => {
    setSearch((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";

    if (!search.searchAuthor && !search.searchTitle) {
      return;
    }
    await axios
      .get(
        `${BOOKS_API}${search.searchTitle.replace(
          " ",
          "+"
        )}+${search.searchAuthor.replace(" ", "+")}&key=${
          process.env.REACT_APP_API_KEY
        }`
      )
      .then((data) => {
        setBookData({
          title: data.data.items[0].volumeInfo.title,
          author: data.data.items[0].volumeInfo.authors[0],
          description: data.data.items[0].volumeInfo.description,
          genre: data.data.items[0].volumeInfo.category,
          image: data.data.items[0].volumeInfo.imageLinks.thumbnail,
          bookId: data.data.items[0].id,
        });
        console.log(data.data.items[0]);
      });
    setSearch({
      title: "",
      author: "",
    });
  };

  const onAddBook = async (e) => {
    await dispatch(createBook(bookData));
    setIsAddBookOpen(false);
    setBookData({
      title: "",
      author: "",
      description: "",
      genre: "",
      image: "",
    });

    if (book && !lists.books.includes(book._id)) {
      dispatch(addBook({bookId: book._id}, listId));
    }
  };

  const onDeleteClick = () => {
    dispatch(deleteList(listId));
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-56 ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center mb-12 bg-slate-200 h-screen">
      <h4 className="text-2xl mt-24 text-slate-900">List name: {lists.name}</h4>
      <div>
        <button
          className="mt-6 bg-green-600 hover:bg-green-800 focus:bg-green-700 px-2 h-10 rounded-md text-lg uppercase text-white"
          onClick={() => setIsAddBookOpen(!isAddBookOpen)}
        >
          Add books
        </button>
        <button
          onClick={onDeleteClick}
          className="bg-red-600 px-2 h-10 ml-4 hover:bg-red-800 focus:bg-red-700 rounded-md text-lg uppercase text-white"
        >
          Delete List
        </button>
      </div>
      {isAddBookOpen && (
        <div className="bg-blue-200 p-5 rounded-lg mt-5 relative ">
          <button
            onClick={() => setIsAddBookOpen(false)}
            className="absolute right-1 top-1"
          >
            <AiFillCloseCircle className="text-slate-600 hover:text-red-600 text-xl" />
          </button>

          <form
            onSubmit={onSearchSubmit}
            className=" flex lg:flex-row flex-col flex-wrap justify-between items-center "
          >
            <input
              autoComplete="off"
              id="author"
              name="searchAuthor"
              value={search.searchAuthor}
              onChange={onChange}
              type="text"
              placeholder="Book author"
              className="px-6 py-2 rounded-lg focus:outline-none m-2"
              required
            />
            <input
              autoComplete="off"
              id="title"
              name="searchTitle"
              value={search.searchTitle}
              onChange={onChange}
              type="text"
              placeholder="Book title"
              className="px-6 py-2 rounded-lg focus:outline-none m-2"
              required
            />
            <button
              className="bg-sky-700 px-2 h-10 rounded-md text-lg uppercase text-white"
              type="submit"
            >
              Find book
            </button>
          </form>
        </div>
      )}
      {bookData.title && (
        <div className="flex m-4 flex-col flex-wrap justify-between items-center mb-12">
          <button
            onClick={() =>
              setBookData({
                title: "",
                author: "",
                description: "",
                genre: "",
                image: "",
              })
            }
          >
            <AiFillCloseCircle className="text-slate-500 text-xl" />
          </button>
          <h4>{bookData.title}</h4>
          <p>{bookData.author}</p>
          <p>{bookData.genre}</p>
          <img src={bookData.image} alt="Book Cover" />
          <button
            onClick={onAddBook}
            className="bg-sky-700 px-2 h-10 m-2 rounded-md text-lg uppercase text-white"
          >
            Add to list
          </button>
        </div>
      )}
      <div className="flex flex-row flex-wrap items-center justify-center">
        {lists.books?.length > 0 ? (
          lists.books.map((book, idx) => (
            <BookComponent
              title={book.title}
              image={book.image}
              author={book.author}
              genre={book.genre}
              bookId={book._id}
              key={idx}
            />
          ))
        ) : (
          <p>No books</p>
        )}
      </div>
    </div>
  );
}
export default List;
