import React from "react";

const Modal = ({ onClose, children }) => {
    return (
      <React.Fragment>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-3xl shadow-md relative">
            <button className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
              <svg className="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  };
  
  export default Modal;
  