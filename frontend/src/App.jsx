import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vault from "./pages/Vault";
import PasswordGenerator from "./pages/PasswordGenerator";
import Settings from "./pages/Settings";
import TwoFactor from "./pages/TwoFactor";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/generator" element={<PasswordGenerator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/2fa" element={<TwoFactor />} />

        {/* Change Password */}
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;