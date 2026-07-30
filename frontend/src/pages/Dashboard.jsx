import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import StatCard from "../components/StatCard";
import SecurityScore from "../components/SecurityScore";
import QuickActions from "../components/QuickActions";
import PasswordStrengthChart from "../components/charts/PasswordStrengthChart";
import SecurityOverviewChart from "../components/charts/SecurityOverviewChart";

import {
  Database,
  ShieldCheck,
  ShieldAlert,
  TriangleAlert,
  Activity,
  Brain,
} from "lucide-react";

function Dashboard() {

  const [stats, setStats] = useState(null);

  const userId = 1;

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/dashboard/stats/${userId}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);

  }, []);

  const calculateScore = () => {

    if (!stats) return 0;

    const weak = stats.weak || 0;
    const medium = stats.medium || 0;
    const reused = stats.reused || 0;

    let score = 100;

    score -= weak * 15;
    score -= medium * 5;
    score -= reused * 20;

    return Math.max(score, 0);

  };

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Security Overview
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor your vault health, password strength and account protection.
          </p>

        </div>

        {/* Top Section */}

        <div className="grid lg:grid-cols-3 gap-6">

          <SecurityScore score={calculateScore()} />

          <QuickActions />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-5">
              Security Status
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Vault Encryption</span>
                <span className="text-green-600 font-semibold">
                  Enabled
                </span>
              </div>

              <div className="flex justify-between">
                <span>Password Health</span>
                <span className="text-green-600 font-semibold">
                  Good
                </span>
              </div>

              <div className="flex justify-between">
                <span>Two-Factor Authentication</span>
                <span className="text-yellow-500 font-semibold">
                  Pending
                </span>
              </div>

              <div className="flex justify-between">
                <span>Security Alerts</span>
                <span className="text-red-500 font-semibold">
                  {stats?.weak || 0}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Stored Passwords"
            value={stats?.total_passwords ?? 0}
            subtitle="Stored securely"
            color="text-blue-600"
            icon={<Database size={34} />}
          />

          <StatCard
            title="Strong Passwords"
            value={stats?.strong ?? 0}
            subtitle="Excellent"
            color="text-green-600"
            icon={<ShieldCheck size={34} />}
          />

          <StatCard
            title="Medium Passwords"
            value={stats?.medium ?? 0}
            subtitle="Needs Improvement"
            color="text-yellow-500"
            icon={<ShieldAlert size={34} />}
          />

          <StatCard
            title="Weak Passwords"
            value={stats?.weak ?? 0}
            subtitle="Immediate Action"
            color="text-red-500"
            icon={<TriangleAlert size={34} />}
          />

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* AI Recommendations */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-5">

              <Brain className="text-blue-600" />

              <h2 className="text-xl font-semibold">
                AI Recommendations
              </h2>

            </div>

            <ul className="space-y-3">

              {(stats?.weak ?? 0) > 0 && (
                <li>• Change weak passwords immediately.</li>
              )}

              {(stats?.medium ?? 0) > 0 && (
                <li>• Improve medium-strength passwords.</li>
              )}

              {(stats?.reused ?? 0) > 0 && (
                <li>• Avoid reusing passwords across websites.</li>
              )}

              {(stats?.weak ?? 0) === 0 &&
                (stats?.medium ?? 0) === 0 &&
                (stats?.reused ?? 0) === 0 && (
                  <li className="text-green-600">
                    Excellent! Your vault is well protected.
                  </li>
                )}

            </ul>

          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-5">

              <Activity className="text-blue-600" />

              <h2 className="text-xl font-semibold">
                Recent Activity
              </h2>

            </div>

            <div className="space-y-4">

              <div>

                <p className="font-medium">
                  Password Vault Accessed
                </p>

                <p className="text-sm text-slate-500">
                  Just now
                </p>

              </div>

              <div>

                <p className="font-medium">
                  AI Security Scan Completed
                </p>

                <p className="text-sm text-slate-500">
                  Today
                </p>

              </div>

              <div>

                <p className="font-medium">
                  Password Generator Used
                </p>

                <p className="text-sm text-slate-500">
                  Yesterday
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Analytics Charts */}

        <div className="grid lg:grid-cols-2 gap-6">

          <PasswordStrengthChart stats={stats} />

          <SecurityOverviewChart stats={stats} />

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;