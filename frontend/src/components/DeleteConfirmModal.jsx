// import React from "react";
// import ReactDOM from "react-dom";

// const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
//   // Render the modal into document.body to avoid layout issues
//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md text-center animate-fadeIn">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//           Confirm Deletion
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Are you sure you want to delete this expense? <br />
//           This action cannot be undone.
//         </p>

//         <div className="flex justify-center gap-4">
//           <button
//             onClick={onCancel}
//             className="px-5 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default DeleteConfirmModal;


import React from "react";
import ReactDOM from "react-dom";

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this expense?<br />This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmModal;
