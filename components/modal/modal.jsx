import React, { useRef } from "react";

const Modal = ({ onDecline, title, children }) => {
  const modalRef = useRef(null);

  const handleBackdropClick = (event) => {
    if (modalRef.current === event.target) {
      onDecline();
    }
  };

  return (
    <div
      ref={modalRef}
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="w-full h-full fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-70 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t bg-gray-200 dark:bg-gray-800 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onDecline}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 max-h-[80vh] overflow-y-auto dark:bg-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
