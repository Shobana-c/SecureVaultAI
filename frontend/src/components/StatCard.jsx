function StatCard({
  title,
  value,
  icon,
  color = "text-blue-600",
  subtitle
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className={`text-3xl font-bold mt-2 ${color}`}>
            {value}
          </h2>

          {subtitle && (
            <p className="text-xs text-slate-400 mt-2">
              {subtitle}
            </p>
          )}

        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;