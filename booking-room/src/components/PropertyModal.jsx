import React, { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaX,
  FaHeart,
  FaLocationDot,
  FaBath,
  FaBed,
  FaRuler,
} from 'react-icons/fa6';

const PropertyModal = ({ property, onClose, favorites, onToggleFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const images = property.images || [];
  if (images.length === 0) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isFavorite = favorites.includes(property.id);

  return (
    <div
      className='fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4'
      onClick={onClose}
    >
      <div
        className='relative bg-white rounded-3xl max-w-4xl w-full md:max-h-[90vh] overflow-y-auto shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image slider section */}
        <div className='relative h-[400px] md:h-[500px] bg-black'>
          <img
            src={images[currentImageIndex]}
            alt={property.name}
            className='w-full h-full object-contain'
          />

          {/* Navigation arrows (only if more than 1 image) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition shadow-lg'
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition shadow-lg'
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className='absolute top-5 right-5 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition shadow-lg'
          >
            <FaX size={20} />
          </button>

          {/* Favorite & Counter */}
          <div className='absolute bottom-4 right-4 flex items-center gap-4'>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`bg-white/80 p-2 rounded-full transition ${
                isFavorite ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <FaHeart />
            </button>
            <div className='bg-black/50 text-white px-3 py-1 rounded-full'>
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Property details */}
        <div className='p-6'>
          <div className='flex items-center gap-2 text-gray-500 text-sm mb-3'>
            <FaLocationDot className='text-blue-600' />
            <span>{property.location}</span>
          </div>

          <h2 className='text-2xl font-bold text-gray-800 mb-2'>{property.name}</h2>

          <div className='text-3xl font-bold text-blue-600 mb-4'>{property.price}</div>
        </div>

        <div className='flex gap-6 mb-6 px-6 bg-gray-50 rounded-lg py-4 mx-6'>
          <div className='flex items-center gap-2'>
            <FaBed className='text-blue-600' />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaBath className='text-blue-600' />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaRuler className='text-blue-600' />
            <span>{property.sqft} sqft</span>
          </div>
        </div>

        <div className='mb-6 px-6'>
          <h3 className='font-semibold mb-2'>Description</h3>
          <p className='text-gray-600'>{property.description}</p>
        </div>

        <button className='w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors mb-6 mx-6 w-[calc(100%-3rem)]'>
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default PropertyModal;