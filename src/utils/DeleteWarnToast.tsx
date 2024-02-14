/* eslint-disable react-refresh/only-export-components */
import { toast } from "react-toastify";

const DeleteWarnToast: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => {
  const closeToast = () => toast.dismiss();

  return (
    <div className="text-gray-800 font-semibold bg-amber-100 p-4 rounded-lg ">
      <div>
        <p className="flex justify-center items-start ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 mr-1 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          {message}
        </p>
      </div>
      <button
        className="mr-2 px-2  bg-red-100 rounded-md text-red-700 font-semibold text-sm border border-red-300 hover:bg-red-200"
        onClick={() => {
          onConfirm();
          closeToast();
        }}
      >
        Confirm
      </button>
      <button
        className="mr-2 px-2  bg-green-100 rounded-md text-green-700 font-semibold text-sm border border-green-400 hover:bg-green-200"
        onClick={() => {
          onCancel();
          closeToast();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export const showConfirmationToast = (
  message: string,
  onConfirm: () => void,
  onCancel: () => void
): void => {
  toast(
    <DeleteWarnToast
      message={message}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />,
    {
      autoClose: false,
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "#fef3c7",
        border: "4px solid #f1c40f",
        borderRadius: "8px",
      },
    }
  );
};

export default DeleteWarnToast;
