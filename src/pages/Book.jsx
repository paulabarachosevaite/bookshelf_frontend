import {useParams, useNavigate, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getBook, reset} from "../features/book/bookSlice";
import {useEffect} from "react";
function Book() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {book} = useSelector((state) => state.book);
  const {user} = useSelector((state) => state.auth);
  const {bookId} = useParams();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBook(bookId));
    return () => dispatch(reset());
  }, [user, dispatch]);

  return (
    book && (
      <div className="mt-32 w-4/6 m-auto">
        <button
          onClick={() => navigate(-1)}
          className="underline underline-offset-4 m-4 block text-slate-600"
        >
          Back to the list
        </button>

        <div className="flex items-center flex-wrap lg:flex-nowrap text-slate-800 justify-center">
          <img src={book.image} className="" />
          <div className="lg:ml-4 flex flex-col items-center lg:items-start">
            <h4 className="text-black text-xl">
              {book.title} <span className="italic">({book.author})</span>
            </h4>
            <p className="text-sm text-center lg:text-start">
              {book.description
                ? book.description
                : "Description not available"}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
export default Book;
