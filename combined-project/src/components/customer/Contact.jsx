import React from 'react';

const Contact = () => {
  const handleContact = () => {
    alert("Thank you for your interest! Our team will reach out soon.");
  };

  return (
    <section className='bg-blue-600 text-white py-16'>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className='text-3xl font-bold mb-4'>Ready To Find Your Dream Home?</h2>
        <p className='mb-8'>Contact our real estate experts today</p>
        <button
          onClick={handleContact}
          className='bg-white text-blue-600 px-8 py-3 rounded-3xl font-semibold hover:bg-blue-50 transition-colors'
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default Contact;