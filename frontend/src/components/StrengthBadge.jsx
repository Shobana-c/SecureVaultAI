function StrengthBadge({ password }) {

  let strength = "Weak";
  let color = "bg-red-500";

  if (password.length >= 12) {
    strength = "Strong";
    color = "bg-green-500";
  }
  else if (password.length >= 8) {
    strength = "Medium";
    color = "bg-yellow-500";
  }

  return (
    <span
      className={`${color} text-white px-3 py-1 rounded-full text-sm`}
    >
      {strength}
    </span>
  );
}

export default StrengthBadge;