import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Copy, RefreshCw, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

function PasswordGenerator() {
  const [length, setLength] = useState(16);

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [password, setPassword] = useState("");

  useEffect(() => {
    generatePassword();
  }, []);

  function generatePassword() {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}<>?/";

    if (chars === "") {
      toast.error("Select at least one option");
      return;
    }

    let pass = "";

    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  }

  function copyPassword() {
    navigator.clipboard.writeText(password);
    toast.success("Password copied");
  }

  function strength() {
    let score = 0;

    if (length >= 12) score += 30;
    if (uppercase) score += 20;
    if (lowercase) score += 20;
    if (numbers) score += 15;
    if (symbols) score += 15;

    return score;
  }

  function strengthText() {
    const s = strength();

    if (s >= 90) return "Excellent";
    if (s >= 70) return "Strong";
    if (s >= 50) return "Medium";

    return "Weak";
  }

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Password Generator
          </h1>

          <p className="text-slate-500 mt-2">
            Generate secure passwords for every account.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="flex gap-3">

            <input
              value={password}
              readOnly
              className="flex-1 border rounded-xl p-4 text-xl font-mono"
            />

            <button
              onClick={copyPassword}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl"
            >
              <Copy size={22}/>
            </button>

          </div>

          <div className="mt-8">

            <label className="font-semibold">

              Password Length : {length}

            </label>

            <input
              type="range"
              min="6"
              max="40"
              value={length}
              onChange={(e)=>setLength(Number(e.target.value))}
              className="w-full mt-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-5 mt-8">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={()=>setUppercase(!uppercase)}
              />
              Uppercase
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={()=>setLowercase(!lowercase)}
              />
              Lowercase
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={numbers}
                onChange={()=>setNumbers(!numbers)}
              />
              Numbers
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={symbols}
                onChange={()=>setSymbols(!symbols)}
              />
              Symbols
            </label>

          </div>

          <div className="mt-8">

            <div className="flex justify-between">

              <span>Password Strength</span>

              <span className="font-semibold">
                {strengthText()}
              </span>

            </div>

            <div className="bg-slate-200 h-3 rounded-full mt-2">

              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: `${strength()}%`
                }}
              />

            </div>

          </div>

          <button
            onClick={generatePassword}
            className="mt-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 py-3 flex items-center gap-2"
          >
            <RefreshCw size={20}/>
            Generate Password
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

          <div className="flex gap-3 items-center">

            <ShieldCheck className="text-green-600"/>

            <h2 className="text-xl font-semibold">

              Password Tips

            </h2>

          </div>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-slate-600">

            <li>Use at least 12 characters.</li>

            <li>Mix uppercase, lowercase, numbers and symbols.</li>

            <li>Never reuse passwords.</li>

            <li>Enable Two-Factor Authentication.</li>

          </ul>

        </div>

      </div>

    </MainLayout>
  );
}

export default PasswordGenerator;