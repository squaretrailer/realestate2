import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaTimes,
  FaArrowLeft,
  FaSignOutAlt,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  const mainNav = [
    { name: "Dashboard", path: "/admin", icon: <FaChartLine /> },
    { name: "Properties", path: "/admin/properties", icon: <FaBuilding /> },
  ];
  const managementNav = [
    { name: "Agents", path: "/admin/agents", icon: <FaUserTie /> },
    { name: "Clients", path: "/admin/clients", icon: <FaUsers /> },
    { name: "Showings", path: "/admin/showings", icon: <FaClipboardList /> },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 md:hidden"><FaTimes size={22} /></button>
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-600">Re.Estate</h1>
          <p className="text-xs text-gray-500 mt-1">Admin Control Panel</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><FaUserCircle size={24} /></div>
          <div><p className="text-sm font-semibold text-gray-800">Admin User</p><p className="text-xs text-gray-500">admin@re.estate</p></div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2"><p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p></div>
          <div className="space-y-1">
            {mainNav.map(item => (
              <NavLink key={item.name} to={item.path} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${isActive ? "bg-teal-50 text-teal-700 font-medium shadow-sm" : "text-gray-700 hover:bg-gray-100"}`}>
                <span className="text-lg">{item.icon}</span><span>{item.name}</span>
              </NavLink>
            ))}
          </div>
          <div className="px-4 mt-6 mb-2"><p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Management</p></div>
          <div className="space-y-1">
            {managementNav.map(item => (
              <NavLink key={item.name} to={item.path} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${isActive ? "bg-teal-50 text-teal-700 font-medium shadow-sm" : "text-gray-700 hover:bg-gray-100"}`}>
                <span className="text-lg">{item.icon}</span><span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 space-y-2">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition"><FaArrowLeft /><span>Back to Site</span></NavLink>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition"><FaSignOutAlt /><span>Logout</span></button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;