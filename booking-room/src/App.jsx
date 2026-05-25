import React, { useState, useEffect } from "react";
import PropertyModal from "./components/PropertyModal";
import FeaturedProperties from "./components/FeaturedProperties";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { properties as allProperties } from "./data/Properties";
import './index.css';

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSearch = (searchTerm, propertyType, location) => {
    let filtered = allProperties;
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (propertyType && propertyType !== "") {
      filtered = filtered.filter(p =>
        p.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }
    if (location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Home onSearch={handleSearch} />
      <FeaturedProperties
        properties={filteredProperties}
        setSelectedProperty={setSelectedProperty}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <Contact />
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

export default App;