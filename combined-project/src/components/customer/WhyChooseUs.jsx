import { FaHandshake, FaShieldAlt, FaChartLine, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { icon: <FaHandshake />, title: "Trusted Agency", desc: "Over 10 years of excellence" },
    { icon: <FaShieldAlt />, title: "Secure Transactions", desc: "100% secure property deals" },
    { icon: <FaChartLine />, title: "Best Market Prices", desc: "Competitive pricing" },
    { icon: <FaClock />, title: "24/7 Support", desc: "Round-the-clock service" },
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We provide the best real estate experience with transparency and integrity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 text-4xl mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;