import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function RevenueChart({ properties }) {
  const soldRevenue = properties?.filter(p => p.status?.toLowerCase() === "sold").reduce((sum, p) => sum + Number(p.price || 0), 0);
  const availableRevenue = properties?.filter(p => p.status?.toLowerCase() === "available").reduce((sum, p) => sum + Number(p.price || 0), 0);
  const data = [{ name: "Available", revenue: availableRevenue || 0 }, { name: "Sold", revenue: soldRevenue || 0 }];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-[400px]">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Revenue Overview</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="name" /><Tooltip /><Bar dataKey="revenue" fill="#14b8a6" radius={[10,10,0,0]} /></BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default RevenueChart;