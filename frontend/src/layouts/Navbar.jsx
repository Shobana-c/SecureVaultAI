import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Security Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Monitor your password security and account protection.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        {/* Notification */}

        <button className="relative p-2 rounded-lg hover:bg-slate-100">

          <Bell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold text-slate-800">
              C Shobana
            </h3>

            <p className="text-sm text-green-600">
              Protected Account
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;