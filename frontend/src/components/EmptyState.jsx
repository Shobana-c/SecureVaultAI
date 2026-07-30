import { ShieldX } from "lucide-react";

function EmptyState() {

  return (

    <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-16 text-center">

      <ShieldX
        size={70}
        className="mx-auto text-slate-400"
      />

      <h2 className="text-2xl font-bold mt-5">

        No Passwords Found

      </h2>

      <p className="text-slate-500 mt-2">

        Add your first password to begin securing your accounts.

      </p>

    </div>

  );

}

export default EmptyState;