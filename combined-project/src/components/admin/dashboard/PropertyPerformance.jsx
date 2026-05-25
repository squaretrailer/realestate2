function PropertyPerformance({ properties }) {
  const total = properties.length;
  const sold = properties.filter(p => p.status?.toLowerCase() === "sold").length;
  const percent = total === 0 ? 0 : Math.round((sold / total) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Property Performance</h2>
      <div className="flex justify-center items-center h-52"><div className="w-40 h-40 rounded-full border-[14px] border-teal-500 flex items-center justify-center text-3xl font-bold text-gray-800">{percent}%</div></div>
      <p className="mt-6 text-sm text-gray-500 text-center">{sold} of {total} properties sold.</p>
    </div>
  );
}
export default PropertyPerformance;