function PasswordStrengthBadge({ password }) {

  function getStrength(password) {

    if (!password)
      return {
        text: "Weak",
        color: "bg-red-100 text-red-600"
      };

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score >= 5) {
      return {
        text: "Strong",
        color: "bg-green-100 text-green-700"
      };
    }

    if (score >= 3) {
      return {
        text: "Medium",
        color: "bg-yellow-100 text-yellow-700"
      };
    }

    return {
      text: "Weak",
      color: "bg-red-100 text-red-700"
    };

  }

  const strength = getStrength(password);

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${strength.color}`}
    >

      {strength.text}

    </span>

  );

}

export default PasswordStrengthBadge;