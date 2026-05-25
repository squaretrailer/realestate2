import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Mwangi",
    role: "Home Buyer",
    text: "Re.Estate helped me find my dream home in just 2 weeks. Excellent service!",
    rating: 5,
  },
  {
    name: "Sarah Wanjiku",
    role: "Investor",
    text: "Professional team, great property selection. Highly recommended.",
    rating: 5,
  },
  {
    name: "Michael Otieno",
    role: "Seller",
    text: "Sold my property above asking price. Thank you!",
    rating: 4,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 mb-12">Real experiences from happy customers</p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <FaQuoteLeft className="text-blue-600 text-3xl mb-4 mx-auto" />
            <p className="text-gray-700 text-lg italic mb-6">{testimonials[active].text}</p>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < testimonials[active].rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <h4 className="font-semibold text-gray-800">{testimonials[active].name}</h4>
            <p className="text-sm text-gray-500">{testimonials[active].role}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === active ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;