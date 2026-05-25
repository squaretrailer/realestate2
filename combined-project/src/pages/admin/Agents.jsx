import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSearch } from "react-icons/fa";
import { isValidKenyanPhone, formatPhoneError } from "../../utils/validation";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [phoneError, setPhoneError] = useState("");
  const itemsPerPage = 10;
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const fetchAgents = async () => { setLoading(true); try { const res = await axios.get("http://localhost:3001/agents"); setAgents(res.data); } catch (err) { console.error(err); } finally { setLoading(false); } };
  useEffect(() => { fetchAgents(); }, []);

  const handleChange = (e) => { const { name, value } = e.target; setForm(prev => ({ ...prev, [name]: value })); if (name === "phone") setPhoneError(formatPhoneError(value) || ""); };
  const resetForm = () => { setForm({ name: "", email: "", phone: "" }); setEditing(null); setPhoneError(""); };
  const openAdd = () => { resetForm(); setShowModal(true); };
  const openEdit = (a) => { setEditing(a); setForm({ name: a.name, email: a.email, phone: a.phone }); setPhoneError(""); setShowModal(true); };
  const handleSubmit = async (e) => { e.preventDefault(); if (!isValidKenyanPhone(form.phone)) { setPhoneError("Invalid Kenyan phone number"); return; } setLoading(true); try { if (editing) await axios.put(`http://localhost:3001/agents/${editing.id}`, form); else await axios.post("http://localhost:3001/agents", form); await fetchAgents(); setShowModal(false); resetForm(); } catch (err) { console.error(err); } finally { setLoading(false); } };
  const deleteAgent = async (id) => { if (confirm("Delete?")) { setLoading(true); try { await axios.delete(`http://localhost:3001/agents/${id}`); await fetchAgents(); } catch (err) { console.error(err); } finally { setLoading(false); } } };
  const filtered = agents.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const totalPages = Math.ceil(filtered.length/itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><div><h1 className="text-2xl font-bold text-gray-800">Agents</h1><p className="text-gray-500">Manage your team</p></div><button onClick={openAdd} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaPlus /> Add Agent</button></div>
      <div className="relative mb-6"><FaSearch className="absolute left-3 top-1/2 text-gray-400" /><input type="text" placeholder="Search by name/email" value={search} onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1);}} className="w-full pl-10 pr-4 py-2 border rounded-lg" /></div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr><th className="p-4 text-left">Name</th><th className="p-4 text-left">Email</th><th className="p-4 text-left">Phone</th><th className="p-4 text-center">Actions</th></tr></thead><tbody>{paginated.map(a=>(<tr key={a.id} className="border-b hover:bg-gray-50"><td className="p-4 font-medium">{a.name}</td><td className="p-4 text-gray-600">{a.email}</td><td className="p-4 text-gray-600">{a.phone}</td><td className="p-4 text-center"><div className="flex justify-center gap-3"><button onClick={()=>openEdit(a)} className="text-teal-600 hover:text-teal-800"><FaEdit /></button><button onClick={()=>deleteAgent(a.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button></div></td></tr>))}</tbody></table></div>{totalPages>1 && (<div className="flex justify-between p-4 border-t bg-gray-50"><button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="px-3 py-1 border rounded">Previous</button><span>Page {currentPage} of {totalPages}</span><button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button></div>)}</div>
      {showModal && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl w-full max-w-md shadow-xl"><div className="flex justify-between p-5 border-b"><h2 className="text-xl font-bold">{editing ? "Edit Agent" : "Add Agent"}</h2><button onClick={()=>{setShowModal(false);resetForm();}}><FaTimes /></button></div><form onSubmit={handleSubmit} className="p-5 space-y-4"><input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required /><input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required /><div><input name="phone" placeholder="Phone (e.g., 0712345678)" value={form.phone} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />{phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}</div><div className="flex gap-3 pt-2"><button type="button" onClick={()=>{setShowModal(false);resetForm();}} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button><button type="submit" disabled={loading} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg">{loading?"Saving...":(editing?"Update":"Save")}</button></div></form></div></div>)}
    </div>
  );
}