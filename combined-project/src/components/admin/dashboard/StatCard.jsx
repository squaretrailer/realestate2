function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-teal-300 transition">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
export default StatCard;