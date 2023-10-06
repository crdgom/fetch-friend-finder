function Pagination({ nextPage, prevPage, handleNextPage, handlePrevPage }) {
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
  
  export default Pagination;