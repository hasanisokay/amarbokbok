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
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
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
    <div className="flex justify-center space-x-2 my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-1 lg:hover:text-blue-500 duration-300 lg:hover:scale-105 active:scale-105 scale-100 active:text-blue-500 border ${currentPage === 1 ? 'invisible' : 'visible'}`}
      >
        Previous
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-3 duration-300 py-1 border-[1px] lg:hover:text-white active:text-white lg:hover:bg-blue-500 lg:hover:scale-105 active:scale-105 scale-100 ${
              currentPage === page ? 'bg-blue-500 text-white' : ''
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
        className={`px-3 py-1 border duration-300 lg:hover:scale-105 active:scale-105 scale-100 lg:hover:text-blue-500 active:text-blue-500 ${currentPage === totalPages ? 'invisible' : 'visible'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
