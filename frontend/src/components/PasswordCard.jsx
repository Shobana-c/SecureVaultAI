import {
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Globe,
  User,
  FileText,
  Calendar,
} from "lucide-react";

import PasswordStrengthBadge from "./PasswordStrengthBadge";

function PasswordCard({
  item,
  showPassword,
  togglePassword,
  copyPassword,
  deletePassword,
}) {

  const getBadgeColor = (category) => {
    switch ((category || "").toLowerCase()) {

      case "work":
        return "bg-blue-100 text-blue-700";

      case "personal":
        return "bg-green-100 text-green-700";

      case "banking":
        return "bg-red-100 text-red-700";

      case "social":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          <img
            src={`https://www.google.com/s2/favicons?domain=${item.website}&sz=64`}
            alt="favicon"
            className="w-12 h-12 rounded-xl border bg-white p-2"
          />

          <div>

            <h2 className="text-lg font-bold text-slate-800">

              {item.website}

            </h2>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">

              <User size={14} />

              {item.username}

            </div>

          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
            item.category
          )}`}
        >
          {item.category || "General"}
        </span>

      </div>

      {/* Password */}

      <div className="mt-6">

        <div className="flex justify-between items-center mb-2">

          <p className="text-sm text-slate-500">

            Password

          </p>

          <PasswordStrengthBadge password={item.password} />

        </div>

        <div className="flex justify-between items-center border rounded-xl px-4 py-3 bg-slate-50">

          <span className="font-mono tracking-wider">

            {showPassword
              ? item.password
              : "••••••••••••••"}

          </span>

          <button
            onClick={togglePassword}
            className="text-slate-600 hover:text-blue-600"
          >

            {showPassword
              ? <EyeOff size={20}/>
              : <Eye size={20}/>}

          </button>

        </div>

      </div>

      {/* Notes */}

      <div className="mt-5">

        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">

          <FileText size={15}/>

          Notes

        </div>

        <p className="text-slate-700">

          {item.notes || "No notes added."}

        </p>

      </div>

      {/* Last Updated */}

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

        <Calendar size={15}/>

        Updated Recently

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mt-6">

        <button
          onClick={() => copyPassword(item.password)}
          className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
        >

          <Copy size={18}/>

          Copy

        </button>

        <button
          onClick={() => deletePassword(item.id)}
          className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >

          <Trash2 size={18}/>

          Delete

        </button>

      </div>

    </div>

  );

}

export default PasswordCard;