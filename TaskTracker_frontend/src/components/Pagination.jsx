import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button 
        className="btn btn-secondary" 
        disabled={currentPage === 0} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      
      <div className="page-numbers">
        {getPageNumbers().map(page => (
          <button
            key={page}
            className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'} page-number-btn`}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ))}
      </div>
      
      <button 
        className="btn btn-secondary" 
        disabled={currentPage >= totalPages - 1} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
