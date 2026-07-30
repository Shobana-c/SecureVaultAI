function CopyButton({ password }) {

  const copy = () => {
    navigator.clipboard.writeText(password);
    alert("Password Copied!");
  };

  return (
    <button
      onClick={copy}
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      📋
    </button>
  );
}

export default CopyButton;