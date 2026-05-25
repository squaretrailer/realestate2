import React, { useState } from "react";
import { FaHeart, FaLocationDot, FaBed, FaBath, FaRuler, FaEye } from "react-icons/fa6";
import { getImageUrl } from "../../assets/imageMapping";

const FeaturedProperties = ({ properties, setSelectedProperty, favorites, onToggleFavorite, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const paginated = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4" id="properties">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>)}
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4" id="properties">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
        <p className="text-center text-gray-500 py-16">No properties match your search.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-4" id="properties">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map(property => (
          <div key={property.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group cursor-pointer" onClick={() => setSelectedProperty(property)}>
            <div className="relative">
              <img src={getImageUrl(property.images?.[0] || property.image)} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" alt={property.title} />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white z-10" onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}><FaHeart className={favorites.includes(property.id) ? "text-red-500" : "text-gray-500"} /></button>
              <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">{property.propertyType || "Property"}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-2"><FaLocationDot className="text-blue-600" /><span>{property.location}</span></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
              <div className="text-2xl font-bold text-blue-600 mb-3">Ksh {Number(property.price).toLocaleString()}</div>
              <div className="flex justify-between text-gray-600 text-sm mb-4">
                <div className="flex items-center gap-1"><FaBed /> {property.bedrooms || "?"} beds</div>
                <div className="flex items-center gap-1"><FaBath /> {property.bathrooms || "?"} baths</div>
                <div className="flex items-center gap-1"><FaRuler /> {property.sqft || "?"} sqft</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSelectedProperty(property); }} className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"><FaEye /> View Details</button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100">Previous</button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100">Next</button>
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;