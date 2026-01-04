import React from 'react';

export const Pagination = ({ pageHandler, page, dynamicPage }) => {
  const getPages = (current, total) => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, '...', total);
      } else if (current >= total - 2) {
        pages.push(1, '...', total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
    return pages; // IMPORTANT: Must return the array!
  };

  const pages = getPages(page, dynamicPage);

  return (
    <div className='flex justify-center items-center gap-4'>
      {/* Prev Button */}
      <button 
        disabled={page === 1} 
        onClick={() => pageHandler(page - 1)}
        className={`${page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"} px-3 py-1 rounded-md`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((item, index) => (
          <span 
            key={index}
            onClick={() => typeof item === "number" && pageHandler(item)}
            className={`cursor-pointer px-2 ${item === page ? "font-bold text-blue-600 underline" : "text-gray-600"}`}
          >
            {item} 
          </span>
        ))}
      </div>

      {/* Next Button */}
      <button 
        disabled={page === dynamicPage} 
        onClick={() => pageHandler(page + 1)}
        className={`${page === dynamicPage ? "bg-gray-300" : "bg-blue-500 text-white"} px-3 py-1 rounded-md`}
      >
        Next
      </button>
    </div>
  );
};