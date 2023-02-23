export default function ListComponent({name, books}) {
  return (
    <div className="flex flex-col align-center shadow-xl rounded-md h-80 justify-between bg-white m-5 w-56 h-56 text-slate-600 hover:scale-105 hover:bg-slate-100 transform transition duration-500 ">
      <h4 className="mt-4 text-start ml-2">List name: {name}</h4>
      <div className="flex flex-wrap items-center justify-evenly">
        {books.length > 1 ? (
          books.map(
            (book, idx) =>
              idx < 4 && (
                <img
                  className="w-16 h-18 m-2"
                  src={book.image}
                  alt="Book Cover"
                />
              )
          )
        ) : books.length === 1 ? (
          <img src={books[0].image} alt="Book Cover" className="w-36" />
        ) : (
          <div>
            <p className="text-xl">List is empty</p>
          </div>
        )}
      </div>
      <div className="text-end m-2">
        {books.length > 0 && (
          <p>
            {books.length > 1 ? <p>{books.length} books</p> : <p>One book</p>}
          </p>
        )}
      </div>
    </div>
  );
}
