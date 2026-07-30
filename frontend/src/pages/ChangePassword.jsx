import MainLayout from "../layouts/MainLayout";

function ChangePassword() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Change Master Password
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Update Password
        </button>

      </div>
    </MainLayout>
  );
}

export default ChangePassword;