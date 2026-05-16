"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Appointment } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Download, Loader2, LogOut, Lock } from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOffice, setFilterOffice] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === "scaleadmin2025") {
      setAuthenticated(true);
      setError(false);
      fetchAppointments();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast.error("Failed to fetch appointments");
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);
    setUpdatingId(null);
    if (error) {
      toast.error("Update failed");
    } else {
      toast.success("Status updated");
      fetchAppointments();
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    if (filterOffice !== "all" && app.preferred_office !== filterOffice) return false;
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (search && !app.full_name.toLowerCase().includes(search.toLowerCase()) && !app.company?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Company", "Office", "State", "Industry", "Budget", "Goal", "Date", "Time", "Status"];
    const rows = filteredAppointments.map((app) => [
      app.full_name,
      app.phone,
      app.company,
      app.preferred_office,
      app.business_state,
      app.industry,
      app.ad_budget,
      app.goal,
      app.preferred_date,
      app.preferred_time,
      app.status || "pending",
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scale-edge-appointments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <Lock size={48} className="mx-auto text-gold" />
            <h1 className="text-2xl font-bold text-navy mt-4">Admin Access</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gold text-navy font-bold py-2 rounded-full"
          >
            Enter
          </button>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-center mt-4"
              >
                Incorrect password
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-navy">Appointments Dashboard</h1>
          <button onClick={() => setAuthenticated(false)} className="flex items-center gap-2 text-red-600 hover:underline">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-navy">{appointments.length}</div>
            <div className="text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === "pending").length}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === "confirmed").length}</div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <div className="text-2xl font-bold text-green-600">{appointments.filter(a => a.status === "completed").length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold mb-1">Office</label>
            <select value={filterOffice} onChange={(e) => setFilterOffice(e.target.value)} className="border rounded-lg px-3 py-1">
              <option value="all">All</option>
              <option value="Abuja (Head Office)">Abuja</option>
              <option value="Kano Office">Kano</option>
              <option value="Kaduna Office">Kaduna</option>
              <option value="Virtual Call">Virtual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-lg px-3 py-1">
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Search</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or company" className="border rounded-lg px-3 py-1" />
          </div>
          <button onClick={exportCSV} className="bg-gold text-navy px-4 py-1 rounded-lg flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold" size={40} /></div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">#</th><th>Name</th><th>Phone</th><th>Company</th><th>Office</th><th>State</th><th>Industry</th><th>Budget</th><th>Goal</th><th>Date</th><th>Time</th><th>Source</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((app, idx) => (
                  <tr key={app.id} className="border-t">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{app.full_name}</td>
                    <td className="p-3">{app.phone}</td>
                    <td className="p-3">{app.company}</td>
                    <td className="p-3">{app.preferred_office}</td>
                    <td className="p-3">{app.business_state}</td>
                    <td className="p-3">{app.industry}</td>
                    <td className="p-3">{app.ad_budget}</td>
                    <td className="p-3">{app.goal}</td>
                    <td className="p-3">{app.preferred_date}</td>
                    <td className="p-3">{app.preferred_time}</td>
                    <td className="p-3">{app.utm_source || "-"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        app.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        app.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {app.status || "pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={app.status || "pending"}
                        onChange={(e) => updateStatus(app.id!, e.target.value)}
                        disabled={updatingId === app.id}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="text-center text-gray-500 text-sm mt-6">Need help? Call 08165510842</div>
      </div>
    </div>
  );
}