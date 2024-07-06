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

  return (
    <div className="flex justify-center space-x-2 my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-1 lg:hover:text-blue-500 duration-300 lg:hover:scale-105 active:scale-105 scale-100 active:text-blue-500 border ${currentPage === 1 ? 'invisible' : 'visible'}`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 duration-300 py-1 border-[1px] lg:hover:text-white active:text-white  lg:hover:bg-blue-500 lg:hover:scale-105 active:scale-105 scale-100  ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
        >
          {index + 1}
        </button>
      ))}
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
