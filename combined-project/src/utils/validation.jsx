// Kenyan phone number validation
export const isValidKenyanPhone = (phone) => {
  const phoneRegex = /^(?:\+254|0|254)?(7|1)\d{8}$/;
  return phoneRegex.test(phone);
};

export const formatPhoneError = (phone) => {
  if (!phone) return "Phone number is required";
  if (!isValidKenyanPhone(phone)) return "Enter a valid Kenyan phone (e.g., 0712345678, +254712345678)";
  return null;
};