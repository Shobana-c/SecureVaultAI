import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function PasswordStrengthChart({ stats }) {

  const data = [
    {
      name: "Strong",
      value: stats?.strong || 0,
    },
    {
      name: "Medium",
      value: stats?.medium || 0,
    },
    {
      name: "Weak",
      value: stats?.weak || 0,
    },
  ];

  const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-5">

        Password Strength Distribution

      </h2>

      <ResponsiveContainer width="100%" height={280}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PasswordStrengthChart;