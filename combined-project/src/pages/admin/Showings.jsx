import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSearch } from "react-icons/fa";
import { getImageUrl } from "../../assets/imageMapping";

export default function Showings() {
  const [showings, setShowings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [form, setForm] = useState({ propertyId: "", clientId: "", agentId: "", date: "", status: "scheduled", location: "" });

  const fetchData = async () => { setLoading(true); try { const [s, p, c, a] = await Promise.all([ axios.get("http://localhost:3001/showings"), axios.get("http://localhost:3001/properties"), axios.get("http://localhost:3001/clients"), axios.get("http://localhost:3001/agents") ]); setShowings(s.data); setProperties(p.data); setClients(c.data); setAgents(a.data); } catch (err) { console.error(err); } finally { setLoading(false); } };
  useEffect(() => { fetchData(); }, []);

  const getProperty = (id) => properties.find(p => String(p.id) === String(id));
  const getClient = (id) => clients.find(c => String(c.id) === String(id));
  const getAgent = (id) => agents.find(a => String(a.id) === String(id));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const resetForm = () => { setForm({ propertyId: "", clientId: "", agentId: "", date: "", status: "scheduled", location: "" }); setEditing(null); };
  const openAdd = () => { resetForm(); setShowModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ propertyId: s.propertyId, clientId: s.clientId, agentId: s.agentId, date: s.date, status: s.status, location: getProperty(s.propertyId)?.location || "" }); setShowModal(true); };
  const handlePropertyChange = (e) => { const pid = e.target.value; const prop = properties.find(p => String(p.id) === String(pid)); setForm({ ...form, propertyId: pid, location: prop?.location || "" }); };
  const handleSubmit = async (e) => { e.preventDefault(); setLoading(true); try { if (form.propertyId && form.location !== undefined) { const prop = properties.find(p => String(p.id) === String(form.propertyId)); if (prop && prop.location !== form.location) await axios.patch(`http://localhost:3001/properties/${form.propertyId}`, { location: form.location }); } const payload = { propertyId: form.propertyId, clientId: form.clientId, agentId: form.agentId, date: form.date, status: form.status }; if (editing) await axios.put(`http://localhost:3001/showings/${editing.id}`, payload); else await axios.post("http://localhost:3001/showings", payload); await fetchData(); setShowModal(false); resetForm(); } catch (err) { console.error(err); } finally { setLoading(false); } };
  const deleteShowing = async (id) => { if (confirm("Delete?")) { setLoading(true); try { await axios.delete(`http://localhost:3001/showings/${id}`); await fetchData(); } catch (err) { console.error(err); } finally { setLoading(false); } } };
  const updateStatus = async (id, status) => { try { await axios.patch(`http://localhost:3001/showings/${id}`, { status }); await fetchData(); } catch (err) { console.error(err); } };
  const markSold = async (pid) => { try { await axios.patch(`http://localhost:3001/properties/${pid}`, { status: "Sold" }); await fetchData(); } catch (err) { console.error(err); } };

  const filtered = showings.filter(s => getProperty(s.propertyId)?.title?.toLowerCase().includes(search.toLowerCase()) || getClient(s.clientId)?.name?.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const totalPages = Math.ceil(filtered.length/itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><div><h1 className="text-2xl font-bold text-gray-800">Showings</h1><p className="text-gray-500">Manage property showings</p></div><button onClick={openAdd} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaPlus /> Add Showing</button></div>
      <div className="relative mb-6"><FaSearch className="absolute left-3 top-1/2 text-gray-400" /><input type="text" placeholder="Search by property or client" value={search} onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1);}} className="w-full pl-10 pr-4 py-2 border rounded-lg" /></div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr><th className="p-4 text-left">Image</th><th className="p-4 text-left">Property</th><th className="p-4 text-left">Client</th><th className="p-4 text-left">Agent</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th><th className="p-4 text-center">Actions</th></tr></thead><tbody>{paginated.map(s=>{ const prop = getProperty(s.propertyId); const client = getClient(s.clientId); const agent = getAgent(s.agentId); return (<tr key={s.id} className="border-b hover:bg-gray-50"><td className="p-4"><img src={getImageUrl(prop?.image)} className="w-10 h-8 object-cover rounded" /></td><td className="p-4 font-medium">{prop?.title}</td><td className="p-4 text-gray-600">{client?.name}</td><td className="p-4 text-gray-600">{agent?.name || "N/A"}</td><td className="p-4">{s.date}</td><td className="p-4"><select value={s.status} onChange={(e)=>updateStatus(s.id, e.target.value)} className="border rounded px-2 py-1 text-sm"><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></td><td className="p-4 text-center"><div className="flex justify-center gap-3"><button onClick={()=>openEdit(s)} className="text-teal-600 hover:text-teal-800"><FaEdit /></button><button onClick={()=>deleteShowing(s.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>{s.status==="completed" && prop?.status !== "Sold" && <button onClick={()=>markSold(prop.id)} className="text-teal-600 ml-2 text-sm">Mark Sold</button>}</div></td></tr>)})}</tbody></table></div>{totalPages>1 && (<div className="flex justify-between p-4 border-t bg-gray-50"><button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="px-3 py-1 border rounded">Previous</button><span>Page {currentPage} of {totalPages}</span><button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button></div>)}</div>
      {showModal && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl w-full max-w-md shadow-xl"><div className="flex justify-between p-5 border-b"><h2 className="text-xl font-bold">{editing ? "Edit Showing" : "Add Showing"}</h2><button onClick={()=>{setShowModal(false);resetForm();}}><FaTimes /></button></div><form onSubmit={handleSubmit} className="p-5 space-y-4"><select name="propertyId" value={form.propertyId} onChange={handlePropertyChange} className="w-full border rounded-lg px-4 py-2" required><option value="">Select Property</option>{properties.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select><input name="location" placeholder="Property Location" value={form.location} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" /><select name="clientId" value={form.clientId} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required><option value="">Select Client</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><select name="agentId" value={form.agentId} onChange={handleChange} className="w-full border rounded-lg px-4 py-2"><option value="">Select Agent</option>{agents.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required /><select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg px-4 py-2"><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><div className="flex gap-3 pt-2"><button type="button" onClick={()=>{setShowModal(false);resetForm();}} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button><button type="submit" disabled={loading} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg">{loading?"Saving...":(editing?"Update":"Save")}</button></div></form></div></div>)}
    </div>
  );
}