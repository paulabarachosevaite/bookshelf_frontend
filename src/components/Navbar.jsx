import {Link, useNavigate} from "react-router-dom";
import {reset, logout} from "../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="fixed top-0 z-10">
      <header className="relative text-slate-200  px-2 py-3 flex justify-between items-center bg-slate-900 w-screen">
        <div className="text-3xl font-bold leading-none">
          <Link to="/" className=" hover:text-amber-500">
            bookshelf
          </Link>
        </div>
        <nav>
          {user && (
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className=" font-semibold uppercase rounded-md p-1  bg-red-600 mr-6  hover:bg-red-800"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
export default Navbar;
