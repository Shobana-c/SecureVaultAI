import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function SecurityScore({ score }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Overall Security Score
      </h2>

      <div className="w-44 mx-auto">

        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#2563EB",
            textColor: "#0F172A",
            trailColor: "#E2E8F0",
          })}
        />

      </div>

      <p className="text-center mt-5 text-green-600 font-semibold">
        {score >= 80
          ? "Excellent"
          : score >= 60
          ? "Good"
          : "Needs Improvement"}
      </p>

    </div>
  );
}

export default SecurityScore;