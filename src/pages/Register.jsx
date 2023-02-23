import {useNavigate, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {reset, register} from "../features/auth/authSlice";
import {useState} from "react";
import {useEffect} from "react";
import {toast} from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;
  const {user, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div className="flex flex-wrap text-slate-600  h-screen justify-evenly items-center text-slate-700">
      <div className="shadow-xl p-8 rounded-lg bg-gray-100">
        <h1 className="text-center pb-4 pt-2 text-lg font-semibold uppercase">
          Enter your details below
        </h1>
        <form className="flex flex-col justify-center items-center">
          <div className="flex flex-col w-80 py-2">
            <label
              htmlFor="name"
              className="py-1 font-semibold text-sm uppercase"
            >
              Name*
            </label>
            <input
              autoComplete="off"
              required
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onChange}
              placeholder="Name"
              className="px-6 py-2 rounded-lg focus:outline-none "
            />
          </div>
          <div className="flex flex-col w-80 py-2">
            <label
              htmlFor="email"
              className="py-1 font-semibold text-sm uppercase"
            >
              Email Address*
            </label>

            <input
              autoComplete="off"
              id="email"
              name="email"
              required
              value={email}
              onChange={onChange}
              type="text"
              placeholder="Email address"
              className="px-6 py-2 rounded-lg focus:outline-none "
            />
          </div>
          <div className="flex flex-col w-80 py-2">
            <label
              htmlFor="password"
              className="py-1 font-semibold text-sm uppercase"
            >
              Password*
            </label>

            <input
              autoComplete="off"
              id="password"
              name="password"
              required
              value={password}
              onChange={onChange}
              type="password"
              placeholder="At least 8 characters"
              className="px-6 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-80 py-2">
            <label
              htmlFor="password2"
              className="py-1 font-semibold text-sm uppercase"
            >
              Repeat Password*
            </label>

            <input
              autoComplete="off"
              id="password2"
              required
              name="password2"
              value={password2}
              onChange={onChange}
              type="password"
              placeholder="Repeat your password"
              className="px-6 py-2 rounded-lg focus:outline-none"
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
          <p className="m-1">Already have an account?</p>
          <Link to="/login" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
