import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSearch } from "react-icons/fa";
import { getImageUrl } from "../../assets/imageMapping";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 10;
  const [form, setForm] = useState({ title: "", location: "", price: "", status: "", image: "", bedrooms: "", bathrooms: "", sqft: "", propertyType: "", description: "" });

  const fetchProps = async () => { setLoading(true); try { const res = await axios.get("http://localhost:3001/properties"); setProperties(res.data); } catch (err) { console.error(err); } finally { setLoading(false); } };
  useEffect(() => { fetchProps(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const resetForm = () => { setForm({ title: "", location: "", price: "", status: "", image: "", bedrooms: "", bathrooms: "", sqft: "", propertyType: "", description: "" }); setEditing(null); };
  const openAdd = () => { resetForm(); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setForm(p); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), sqft: Number(form.sqft) };
      if (editing) await axios.put(`http://localhost:3001/properties/${editing.id}`, payload);
      else await axios.post("http://localhost:3001/properties", payload);
      await fetchProps();
      setShowModal(false);
      resetForm();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const deleteProp = async (id) => { if (confirm("Delete?")) { setLoading(true); try { await axios.delete(`http://localhost:3001/properties/${id}`); await fetchProps(); } catch (err) { console.error(err); } finally { setLoading(false); } } };

  const filtered = properties.filter(p => (p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())) && (statusFilter === "all" || p.status?.toLowerCase() === statusFilter.toLowerCase()));
  const sorted = [...filtered].sort((a,b) => { let av = a[sortField], bv = b[sortField]; if(sortField==="price") { av=Number(av); bv=Number(bv); } if(av<bv) return sortOrder==="asc"?-1:1; if(av>bv) return sortOrder==="asc"?1:-1; return 0; });
  const paginated = sorted.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const totalPages = Math.ceil(sorted.length/itemsPerPage);
  const handleSort = (field) => { if(sortField===field) setSortOrder(sortOrder==="asc"?"desc":"asc"); else { setSortField(field); setSortOrder("asc"); } setCurrentPage(1); };
  const getStatusBadge = (s) => { const c = { available:"bg-green-100 text-green-700", sold:"bg-red-100 text-red-700", pending:"bg-yellow-100 text-yellow-700" }; return c[s?.toLowerCase()] || "bg-gray-100 text-gray-700"; };

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><div><h1 className="text-2xl font-bold text-gray-800">Properties</h1><p className="text-gray-500">Manage listings</p></div><button onClick={openAdd} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaPlus /> Add Property</button></div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm border"><div className="flex-1 relative"><FaSearch className="absolute left-3 top-1/2 text-gray-400" /><input type="text" placeholder="Search title/location" value={search} onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1);}} className="w-full pl-10 pr-4 py-2 border rounded-lg" /></div><select value={statusFilter} onChange={(e)=>{setStatusFilter(e.target.value); setCurrentPage(1);}} className="border rounded-lg px-4 py-2 bg-white"><option value="all">All Status</option><option value="available">Available</option><option value="sold">Sold</option><option value="pending">Pending</option></select></div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr><th className="p-4 text-left cursor-pointer" onClick={()=>handleSort("title")}>Title {sortField==="title"&&(sortOrder==="asc"?"↑":"↓")}</th><th className="p-4 text-left cursor-pointer" onClick={()=>handleSort("location")}>Location {sortField==="location"&&(sortOrder==="asc"?"↑":"↓")}</th><th className="p-4 text-left cursor-pointer" onClick={()=>handleSort("price")}>Price (Ksh) {sortField==="price"&&(sortOrder==="asc"?"↑":"↓")}</th><th className="p-4 text-left">Status</th><th className="p-4 text-left">Details</th><th className="p-4 text-center">Actions</th></tr></thead><tbody>{paginated.map(p=>(<tr key={p.id} className="border-b hover:bg-gray-50"><td className="p-4"><div className="flex items-center gap-3"><img src={getImageUrl(p.image)} className="w-8 h-8 rounded object-cover" /><span className="font-medium">{p.title}</span></div></td><td className="p-4 text-gray-600">{p.location}</td><td className="p-4 font-semibold">{Number(p.price).toLocaleString()}</td><td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(p.status)}`}>{p.status}</span></td><td className="p-4 text-gray-500 text-sm">{p.bedrooms||"?"}b / {p.bathrooms||"?"}ba / {p.sqft||"?"}sqft</td><td className="p-4 text-center"><div className="flex justify-center gap-3"><button onClick={()=>openEdit(p)} className="text-teal-600 hover:text-teal-800"><FaEdit /></button><button onClick={()=>deleteProp(p.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button></div></td></tr>))}</tbody></table></div>{totalPages>1 && (<div className="flex justify-between p-4 border-t bg-gray-50"><button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="px-3 py-1 border rounded">Previous</button><span>Page {currentPage} of {totalPages}</span><button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button></div>)}</div>
      {showModal && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"><div className="flex justify-between p-5 border-b sticky top-0 bg-white"><h2 className="text-xl font-bold">{editing ? "Edit Property" : "Add Property"}</h2><button onClick={()=>{setShowModal(false);resetForm();}}><FaTimes /></button></div><form onSubmit={handleSubmit} className="p-5 space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border rounded-lg px-4 py-2" required /><input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border rounded-lg px-4 py-2" required /><input name="price" type="number" placeholder="Price (Ksh)" value={form.price} onChange={handleChange} className="border rounded-lg px-4 py-2" required /><select name="status" value={form.status} onChange={handleChange} className="border rounded-lg px-4 py-2" required><option value="">Select Status</option><option value="Available">Available</option><option value="Sold">Sold</option><option value="Pending">Pending</option></select><input name="image" placeholder="Image filename" value={form.image} onChange={handleChange} className="border rounded-lg px-4 py-2" /><input name="propertyType" placeholder="Property Type" value={form.propertyType} onChange={handleChange} className="border rounded-lg px-4 py-2" /><input name="bedrooms" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} className="border rounded-lg px-4 py-2" /><input name="bathrooms" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} className="border rounded-lg px-4 py-2" /><input name="sqft" type="number" placeholder="Sqft" value={form.sqft} onChange={handleChange} className="border rounded-lg px-4 py-2" /><textarea name="description" placeholder="Description" rows="3" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2 md:col-span-2"></textarea></div><div className="flex gap-3 pt-4"><button type="button" onClick={()=>{setShowModal(false);resetForm();}} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button><button type="submit" disabled={loading} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg">{loading?"Saving...":(editing?"Update":"Save")}</button></div></form></div></div>)}
    </div>
  );
}