import { useState } from "react";
import {
  Globe,
  User,
  Lock,
  Folder,
  FileText,
  Eye,
  EyeOff,
  WandSparkles,
} from "lucide-react";

function PasswordForm({
  website,
  setWebsite,
  username,
  setUsername,
  password,
  setPassword,
  category,
  setCategory,
  notes,
  setNotes,
  addPassword,
}) {

  const [showPassword, setShowPassword] = useState(false);

  function generatePassword() {

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let pwd = "";

    for (let i = 0; i < 16; i++) {

      pwd += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );

    }

    setPassword(pwd);

  }

  function calculateStrength() {

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score >= 5)
      return {
        text: "Strong",
        color: "bg-green-500",
        width: "100%",
      };

    if (score >= 3)
      return {
        text: "Medium",
        color: "bg-yellow-500",
        width: "65%",
      };

    return {
      text: "Weak",
      color: "bg-red-500",
      width: "30%",
    };

  }

  const strength = calculateStrength();

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

      <h2 className="text-2xl font-semibold mb-6">

        Add New Password

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {/* Website */}

        <div className="relative">

          <Globe
            className="absolute left-4 top-4 text-slate-400"
            size={18}
          />

          <input
            placeholder="Website"
            value={website}
            onChange={(e)=>setWebsite(e.target.value)}
            className="border rounded-xl pl-11 p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Username */}

        <div className="relative">

          <User
            className="absolute left-4 top-4 text-slate-400"
            size={18}
          />

          <input
            placeholder="Username / Email"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="border rounded-xl pl-11 p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Password */}

      <div className="relative mt-5">

        <Lock
          className="absolute left-4 top-4 text-slate-400"
          size={18}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border rounded-xl pl-11 pr-24 p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-16 top-3 text-slate-500"
        >

          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

        </button>

        <button
          type="button"
          onClick={generatePassword}
          className="absolute right-3 top-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
        >

          <WandSparkles size={18}/>

        </button>

      </div>

      {/* Strength */}

      <div className="mt-3">

        <div className="flex justify-between text-sm mb-2">

          <span>Password Strength</span>

          <span>{strength.text}</span>

        </div>

        <div className="h-2 bg-slate-200 rounded-full">

          <div
            className={`${strength.color} h-2 rounded-full transition-all`}
            style={{ width: strength.width }}
          />

        </div>

      </div>

      {/* Category */}

      <div className="relative mt-5">

        <Folder
          className="absolute left-4 top-4 text-slate-400"
          size={18}
        />

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="border rounded-xl pl-11 p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        >

          <option value="">Select Category</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Banking</option>
          <option>Social</option>

        </select>

      </div>

      {/* Notes */}

      <div className="relative mt-5">

        <FileText
          className="absolute left-4 top-4 text-slate-400"
          size={18}
        />

        <textarea
          rows="4"
          placeholder="Notes"
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          className="border rounded-xl pl-11 p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Save */}

      <button
        onClick={addPassword}
        disabled={!website || !username || !password}
        className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition ${
          !website || !username || !password
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >

        Save Password

      </button>

    </div>

  );

}

export default PasswordForm;