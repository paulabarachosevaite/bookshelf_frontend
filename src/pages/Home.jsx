import CreateList from "../components/CreateList";
import {useEffect} from "react";
import {getAllLists, reset} from "../features/lists/listSlice";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ListComponent from "../components/ListComponent";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {lists, isError, message} = useSelector((state) => state.lists);
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getAllLists());

    return () => {
      dispatch(reset());
    };
  }, [isError, user, dispatch]);

  return (
    user && (
      <div className="bg-slate-200 min-h-screen">
        <div className="mt-14 ">
          <CreateList />
          <div className="flex w-full flex-wrap items-center justify-center">
            {lists &&
              (lists.length > 0 ? (
                lists.map((list, idx) => (
                  <Link to={"/list/" + list._id}>
                    <ListComponent
                      key={idx}
                      name={list.name}
                      books={list.books}
                      id={list._id}
                    />
                  </Link>
                ))
              ) : (
                <div>No lists found</div>
              ))}
          </div>
        </div>
      </div>
    )
  );
}
export default Home;
