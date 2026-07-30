import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(data.detail || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-white w-96 p-10 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register for SecureVault AI
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Master Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded mb-6"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;