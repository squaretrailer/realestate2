import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-blue-100 mb-8">Get the latest property listings and real estate news</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3 rounded-lg" required />
          <button type="submit" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Subscribe</button>
        </form>
        {status === "success" && <p className="text-green-200 mt-3">Subscribed successfully!</p>}
        {status === "error" && <p className="text-red-200 mt-3">Please enter a valid email.</p>}
      </div>
    </section>
  );
};

export default Newsletter;