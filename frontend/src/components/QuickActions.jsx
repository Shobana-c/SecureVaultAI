import { Link } from "react-router-dom";
import {
  Lock,
  Fingerprint,
  KeyRound,
} from "lucide-react";

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <Link
          to="/vault"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
        >
          <Lock size={20} />
          Password Vault
        </Link>

        <Link
          to="/generator"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
        >
          <KeyRound size={20} />
          Password Generator
        </Link>

        <Link
          to="/2fa"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
        >
          <Fingerprint size={20} />
          Configure 2FA
        </Link>

      </div>

    </div>
  );
}

export default QuickActions;