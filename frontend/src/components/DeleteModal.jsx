import { Trash2 } from "lucide-react";

function DeleteModal({ open, onClose, onDelete }) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">

        <div className="flex justify-center">
          <Trash2 className="text-red-500" size={45} />
        </div>

        <h2 className="text-2xl font-bold text-center mt-4">
          Delete Password
        </h2>

        <p className="text-slate-500 text-center mt-2">
          Are you sure you want to delete this password?
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-3"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white rounded-xl py-3"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;