import {AiFillCloseCircle} from "react-icons/ai";
import {deleteBook} from "../features/book/bookSlice";
import {getList, reset} from "../features/lists/listSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
function BookComponent({title, author, genre, image, bookId}) {
  const {lists} = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    dispatch(deleteBook(bookId))
      .then(() => {
        dispatch(getList(lists._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="relative bg-white w-56 m-4 text-center shadow-xl rounded-md h-80 ">
      <button onClick={onDeleteClick} className="absolute right-1 top-1">
        <AiFillCloseCircle className="text-red-500 text-xl hover:text-red-700" />
      </button>
      <div className="flex flex-col items-center mt-6 h-4/5">
        <p>{title}</p>
        <p className="italic text-sm">{author}</p>
        <p>{genre}</p>
        <img
          src={image}
          className="mb-4 h-40 w-28 object-cover"
          alt="Book Cover"
        />
      </div>
      <Link
        to={"/book/" + bookId}
        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800"
      >
        Read more
      </Link>
    </div>
  );
}
export default BookComponent;
