import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/books/";

const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookData, config);

  return response.data;
};

const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + bookId, config);

  return response.data;
};

const getBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + bookId, config);
  console.log(response.data);
  return response.data;
};

const booksService = {
  createBook,
  deleteBook,
  getBook,
};
export default booksService;
