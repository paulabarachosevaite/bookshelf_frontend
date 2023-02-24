import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {reset, login} from "../features/auth/authSlice";
import {useState} from "react";
import {useEffect} from "react";
import {BiErrorCircle} from "react-icons/bi";

function Login() {
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const {user, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setIsWrongCredentials(true);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, user, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <div className="flex flex-col items-center">
      {isWrongCredentials && (
        <div
          className={
            !isWrongCredentials
              ? "hidden"
              : "mt-16 bg-red-200 flex items-center h-12 w-1/2 rounded-md fixed"
          }
        >
          <BiErrorCircle className="text-red-800 mr-2 ml-2" />
          <h4 className="text-slate-800">Wrong credentials!</h4>
        </div>
      )}

      <div className="flex flex-col text-slate-600 h-screen justify-center items-center">
        <div className="shadow-xl p-8 rounded-lg bg-gray-100">
          <h1 className="text-center pb-4 pt-2 text-lg font-semibold uppercase">
            Enter your details below
          </h1>
          <form className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-80 py-2">
              <label
                htmlFor="email"
                className="py-1 text-sm font-semibold uppercase"
              >
                Email Address
              </label>

              <input
                autoComplete="off"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email address"
                className="px-6 py-2 rounded-lg focus:outline-none "
                required
              />
            </div>
            <div className="flex flex-col w-80 py-2">
              <label
                htmlFor="password"
                className="py-1 font-semibold text-sm uppercase"
              >
                Password
              </label>

              <input
                autoComplete="off"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
                className="px-6 py-2 rounded-lg focus:outline-none"
                required
              />
            </div>

            <button
              className="bg-sky-700 px-6 py-2 rounded-md w-80 mt-3 text-lg uppercase text-white"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
          <div className="flex items-center justify-center mt-2">
            <p className="m-1">Don't have account?</p>
            <Link to="/register" className="underline underline-offset-4">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
