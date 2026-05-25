import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/customer/Navbar";
import Hero from "../components/customer/Hero";
import FeaturedProperties from "../components/customer/FeaturedProperties";
import WhyChooseUs from "../components/customer/WhyChooseUs";
import Testimonials from "../components/customer/Testimonials";
import Newsletter from "../components/customer/Newsletter";
import Footer from "../components/customer/Footer";
import PropertyModal from "../components/customer/PropertyModal";

export default function CustomerLayout() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProperties(); }, []);
  useEffect(() => { localStorage.setItem("favorites", JSON.stringify(favorites)); }, [favorites]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/properties");
      setProperties(res.data);
      setFilteredProperties(res.data);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleSearch = (filters) => {
    let filtered = properties;
    if (filters.location) filtered = filtered.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.propertyType) filtered = filtered.filter(p => p.propertyType?.toLowerCase() === filters.propertyType.toLowerCase());
    if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice);
    if (filters.bedrooms) filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <FeaturedProperties
        properties={filteredProperties}
        setSelectedProperty={setSelectedProperty}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        loading={loading}
      />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}