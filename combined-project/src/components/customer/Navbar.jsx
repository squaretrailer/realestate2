import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Properties", href: "#properties" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">Re.Estate</Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-gray-700 hover:text-blue-600 transition font-medium">{link.name}</a>)}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Admin Login</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => <a key={link.name} href={link.href} className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>{link.name}</a>)}
            <Link to="/admin" className="block px-3 py-2 text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Admin Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;