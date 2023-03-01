import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "/api/lists/";

const getList = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + listId, config);
  return response.data;
};
const getAllLists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const createList = async (listData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, listData, config);
  return response.data;
};
const addBook = async (bookId, listId, token) => {
  const data = {bookId, listId};
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + listId, data, config);
  return response.data;
};

const deleteList = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + listId, config);
  return response.data;
};

const listService = {
  getAllLists,
  getList,
  createList,
  deleteList,
  addBook,
};
export default listService;
