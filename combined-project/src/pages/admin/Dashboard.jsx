import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/admin/dashboard/StatCard";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import PropertyPerformance from "../../components/admin/dashboard/PropertyPerformance";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, a, c] = await Promise.all([
          axios.get("http://localhost:3001/properties"),
          axios.get("http://localhost:3001/agents"),
          axios.get("http://localhost:3001/clients"),
        ]);
        setProperties(p.data);
        setAgents(a.data);
        setClients(c.data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const available = properties.filter(p => p.status?.toLowerCase() === "available").length;
  const sold = properties.filter(p => p.status?.toLowerCase() === "sold").length;
  const revenue = properties.filter(p => p.status?.toLowerCase() === "sold").reduce((sum, p) => sum + Number(p.price || 0), 0);

  if (loading) return <div className="text-center py-20">Loading Dashboard...</div>;

  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1><p className="text-gray-500">Monitor your real estate business</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Properties" value={properties.length} />
        <StatCard title="Available" value={available} />
        <StatCard title="Total Clients" value={clients.length} />
        <StatCard title="Active Agents" value={agents.length} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Sold Properties" value={sold} />
        <StatCard title="Revenue" value={`Ksh ${revenue.toLocaleString()}`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><RevenueChart properties={properties} /></div>
        <div><PropertyPerformance properties={properties} /></div>
      </div>
    </div>
  );
}