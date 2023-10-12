import { useState } from "react";
import { searchDogs } from "../../services/userService";

export const usePagination = (next, prev) => {
  const [nextPage, setNextPage] = useState(next);
  const [prevPage, setPrevPage] = useState(prev);

  const handleNextPage = () => {
    if (nextPage) {
      searchDogs(nextPage).then((response) => {
        setNextPage(response.next);
      });
    }
    setNextPage(nextPage);
  };

  const handlePrevPage = () => {
    if (prevPage) {
      searchDogs(prevPage).then((response) => {
        console.log(response.prev);
        setPrevPage(response.prev);
      });
    }
    setPrevPage(prevPage);
  };

  return {
    nextPage,
    prevPage,
    handleNextPage,
    handlePrevPage,
  };
};


/* function Pagination({ nextPage, prevPage, handleNextPage, handlePrevPage }) {
    return (
      <div className="pagination">
        {prevPage && (
          <button className='btn btn-primary' onClick={handlePrevPage}>Prev</button>
        )}
        {nextPage && (
          <button className='btn btn-primary' onClick={handleNextPage}>Next</button>
        )}
      </div>
    );
  }
  
  export default Pagination; */