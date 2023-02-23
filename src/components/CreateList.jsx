import {useEffect, useState} from "react";
import {createList, reset, getAllLists} from "../features/lists/listSlice";
import {useDispatch, useSelector} from "react-redux";

function CreateList() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const {isError, message} = useSelector((state) => state.lists);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, message, isError]);

  const onCreateList = (e) => {
    e.preventDefault();
    const listData = {
      name,
    };
    dispatch(createList(listData))
      .then((result) => {
        dispatch(getAllLists());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center  ">
      <form
        className="flex lg:flex-row  flex-col flex-wrap lg:w-2/5 items-center justify-center mt-5 "
        onClick={onCreateList}
      >
        <label
          htmlFor="list"
          className="text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4 text-xl"
        >
          Create new list
        </label>
        <input
          className="shadow appearance-none border border-slate-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-4 ml-4"
          placeholder="List name"
          id="list"
          name="name"
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 mb-3 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
export default CreateList;
