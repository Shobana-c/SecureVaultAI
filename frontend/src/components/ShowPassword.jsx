import { useState } from "react";

function ShowPassword({ password }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="font-mono">
        {show ? password : "•".repeat(password.length)}
      </span>

      <button
        onClick={() => setShow(!show)}
        className="text-blue-600 hover:text-blue-800"
      >
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}

export default ShowPassword;