import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaBed, FaDollarSign } from "react-icons/fa";

const heroBg = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

const Hero = ({ onSearch }) => {
  const [filters, setFilters] = useState({ location: "", propertyType: "", minPrice: "", maxPrice: "", bedrooms: "" });

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <section className="relative bg-cover bg-center h-[600px] flex items-center" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto px-4 w-full text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Find Your <span className="text-blue-400">Dream Home</span></h1>
        <p className="text-xl text-gray-200 mb-8">Discover the perfect property with our expert real estate services</p>
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative"><FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg" /></div>
            <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg"><option value="">Property Type</option><option value="Apartment">Apartment</option><option value="House">House</option><option value="Villa">Villa</option><option value="Condo">Condo</option></select>
            <div className="relative"><FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg" /></div>
            <div className="relative"><FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg" /></div>
            <div className="relative"><FaBed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="number" name="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border rounded-lg" /></div>
            <button type="submit" className="md:col-span-2 lg:col-span-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"><FaSearch /> Search</button>
          </form>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="text-white">Popular:</span>
          {["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu"].map(loc => (
            <button key={loc} onClick={() => { setFilters({...filters, location: loc}); onSearch({...filters, location: loc}); }} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm">{loc}</button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;