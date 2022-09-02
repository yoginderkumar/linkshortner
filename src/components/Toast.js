import React from "react";

const Toast = ({ title, type, description, onClose }) => {
  const bgColor =
    type === "error" ? "red" : type === "success" ? "green" : "blue";
  return (
    <div
      className={`bg-${bgColor}-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 absolute right-2 bottom-2 z-10`}
      id="static-example"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-mdb-autohide="false"
    >
      <div
        className={`bg-${bgColor}-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-${bgColor}-500 rounded-t-lg`}
      >
        <p className="font-bold text-white flex items-center">{title}</p>
        <div className="flex items-center">
          <button
            type="button"
            className="text-white opacity-90 text-xs"
            data-mdb-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <div className={`p-3 ${bgColor} rounded-b-lg break-words text-white`}>
        {description || "Click on close!"}
      </div>
    </div>
  );
};

export default Toast;
