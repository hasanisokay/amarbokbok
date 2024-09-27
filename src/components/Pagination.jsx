'use client'
import { useRouter } from 'next/navigation';

const Pagination = ({ total, currentPage, limit }) => {
  const router = useRouter();
  const totalPages = Math.ceil(total / limit);
  const handlePageChange = (page) => {
    const query = new URLSearchParams(window.location.search);
    query.set('page', page);
    router.push(`${window.location.pathname}?${query.toString()}`, undefined, { shallow: true });
  };

  const getPageNumbers = () => {
    let width = window.innerWidth;
    let endValue 
    if(width > 786){
      endValue = 4
    }else{
      endValue = 2
    }
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + endValue);
    if (endPage - startPage < endValue) {
      startPage = Math.max(1, endPage - endValue);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return ( 
    <div className="flex justify-center gap-2 text-xs md:text-sm my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`rounded-btn lg:hover:text-blue-500 duration-300 lg:hover:scale-105 active:scale-105 scale-100 active:text-blue-500 border ${currentPage === 1 ? 'md:invisible hidden' : 'visible'}`}
      >
        Previous
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`rounded-btn  duration-300 lg:hover:text-white active:text-white lg:hover:bg-blue-500 lg:hover:scale-105 active:scale-105 scale-100 ${
              currentPage === page ? 'rounded-btn-active' : 'rounded-btn-inactive'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            {page}
          </span>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`rounded-btn border duration-300 lg:hover:scale-105 active:scale-105 scale-100 hover-blue ${currentPage === totalPages ? 'md:invisible hidden' : 'visible'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
