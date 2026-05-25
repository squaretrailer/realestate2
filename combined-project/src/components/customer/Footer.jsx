import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div><h3 className="text-xl font-bold mb-4">Re.Estate</h3><p className="text-gray-400 text-sm">Your trusted partner in finding the perfect home.</p></div>
        <div><h4 className="font-semibold mb-4">Quick Links</h4><ul className="space-y-2 text-gray-400 text-sm"><li><a href="#" className="hover:text-white">Home</a></li><li><a href="#properties" className="hover:text-white">Properties</a></li><li><a href="#about" className="hover:text-white">About Us</a></li><li><a href="#contact" className="hover:text-white">Contact</a></li></ul></div>
        <div><h4 className="font-semibold mb-4">Contact Info</h4><ul className="space-y-2 text-gray-400 text-sm"><li className="flex items-center gap-2"><FaMapMarkerAlt /> Nairobi, Kenya</li><li className="flex items-center gap-2"><FaPhone /> +254 700 123 456</li><li className="flex items-center gap-2"><FaEnvelope /> info@re.estate</li></ul></div>
        <div><h4 className="font-semibold mb-4">Follow Us</h4><div className="flex space-x-4"><a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"><FaFacebook /></a><a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600"><FaTwitter /></a><a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600"><FaInstagram /></a><a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600"><FaLinkedin /></a></div></div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} Re.Estate. All rights reserved.</div>
    </footer>
  );
};

export default Footer;