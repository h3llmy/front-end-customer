import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pagination = ({ data, onPageChange }) => {
  const totalPages = data?.totalPages;

  const useCurrentPage = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      if (router.isReady) {
        if (Number(router.query.page) <= 0) {
          router.query.page = 1;
        }
        setCurrentPage(Number(router.query.page) || 1);
      }
    }, [router.query.page, router.isReady]);

    return currentPage;
  };

  const currentPage = useCurrentPage();

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  useEffect(() => {
    if (totalPages < currentPage) {
      onPageChange(totalPages);
    }
  }, [totalPages]);

  const displayPages = 5;
  let pageStart = currentPage - Math.floor(displayPages / 2);
  pageStart = Math.max(pageStart, 1);
  let pageEnd = pageStart + displayPages - 1;
  pageEnd = Math.min(pageEnd, totalPages);

  const pageButtons = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    pageButtons.push(
      <li key={i}>
        <button
          onClick={() => handlePageClick(i)}
          className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            currentPage === i
              ? "cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700"
              : "dark:bg-gray-800"
          }`}
        >
          {i}
        </button>
      </li>
    );
  }

  if (totalPages > 1) {
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px shadow-md">
          <li>
            <button
              onClick={handlePreviousClick}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "cursor-not-allowed" : null
              } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              Previous
            </button>
          </li>
          {pageButtons}
          <li>
            <button
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages ? "cursor-not-allowed" : null
              } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Pagination;
