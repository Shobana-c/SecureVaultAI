import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Settings() {

  const navigate = useNavigate();


  // Change Master Password
  const changePassword = () => {
    navigate("/change-password");
  };


  // Backup Vault
  const backupVault = () => {

    const passwords = localStorage.getItem("passwords");

    if (!passwords) {
      toast.error("No vault data available");
      return;
    }


    const blob = new Blob(
      [passwords],
      { type: "application/json" }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "SecureVault_Backup.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    toast.success("Vault backup downloaded");
  };


  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");

  };


  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        ⚙ Settings
      </h1>


      <div className="bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold mb-5">
          Account Settings
        </h2>


        <div className="flex gap-4">


          <button
            onClick={changePassword}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
          >
            Change Master Password
          </button>



          <button
            onClick={backupVault}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
          >
            Backup Vault
          </button>



          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition"
          >
            Logout
          </button>


        </div>


      </div>


    </MainLayout>
  );
}


export default Settings;