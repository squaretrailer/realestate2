import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CustomerLayout from "./layouts/CustomerLayout";
import DashboardLayout from "./components/admin/layout/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import PropertiesAdmin from "./pages/admin/Properties";
import Agents from "./pages/admin/Agents";
import Clients from "./pages/admin/Clients";
import Showings from "./pages/admin/Showings";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<PropertiesAdmin />} />
            <Route path="agents" element={<Agents />} />
            <Route path="clients" element={<Clients />} />
            <Route path="showings" element={<Showings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;