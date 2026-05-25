import { FaBell, FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-black px-6 py-4 flex justify-between items-center shadow-sm border-b border-cyan-800">
      <div className="flex items-center bg-gray-800 px-4 py-2 rounded-xl w-96">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search properties..."
          className="bg-transparent outline-none ml-3 w-full text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export default Navbar;