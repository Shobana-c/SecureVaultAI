import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Vault,
  KeyRound,
  ShieldCheck,
  Settings,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Password Vault",
      path: "/vault",
      icon: <Vault size={20} />,
    },
    {
      name: "Password Generator",
      path: "/generator",
      icon: <KeyRound size={20} />,
    },
    {
      name: "Two-Factor Auth",
      path: "/2fa",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <h1 className="text-2xl font-bold tracking-wide">
          SecureVault AI
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Security Intelligence Platform
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}

      </nav>

      {/* Footer */}

      <div className="p-6 border-t border-slate-800">

        <div className="bg-slate-800 rounded-xl p-4">

          <h3 className="font-semibold">
            Security Status
          </h3>

          <p className="text-green-400 text-sm mt-2">
            Protected
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;