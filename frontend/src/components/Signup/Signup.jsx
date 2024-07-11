import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../../assets/signup.png";
import axios from "axios";

const Signup = () => {
  const userTypeOptions = [
    "individual",
    "hallOwner",
    "catering",
    "photographer",
    "musician",
    "performer",
    "speaker",
    "decorator"
  ];
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: "individual", // Set a default value if needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/signup/", formData)
      .then(navigate("/login"))
      .catch((err) => {if (err.response && err.response.data && err.response.data.errorMessage) {
        // If the backend provides a detailed error message
        setError(err.response.data.errorMessage);
      } else {
        // Generic error message if no specific details are available
        setError("An error occurred. Please try again.");
      }
    })
  };

  const wrapperStyle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle = {
    display: "flex",
    height: "75vh",
    width: "60vw",
  };

  const formStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
  };

  const imageStyle = {
    flex: "1",
    background: `url(${signupImage}) center/auto no-repeat`,
    backgroundColor: "#fff",
  };

  return (
    <div style={wrapperStyle} className="bg-gray-200">
      <div className="rounded-2xl shadow-2xl overflow-hidden" style={containerStyle}>
        <div style={formStyle}>
          <form onSubmit={handleSubmit} className="h-full w-full px-5 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Signup</h2>
            {error && (
              <p className="mt-4 text-m text-red-600">
                Error: {error}
              </p>
            )}
            <div className="flex gap-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-1 border border-gray-300 rounded mb-4"
                  placeholder="John"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-1 border border-gray-300 rounded mb-4"
                  placeholder="Doe"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-1 border border-gray-300 rounded mb-4"
              placeholder="john@email.com"
              onChange={handleChange}
            />

            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-1 border border-gray-300 rounded mb-4"
              placeholder="p@55w0rd"
              onChange={handleChange}
            />

            <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg mb-4 cursor-pointer"
              defaultValue="individual"
              onChange={handleChange}
            >
              <option value="" disabled>
                Choose your user type
              </option>
              {userTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {capitalizeWords(option)}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded"
            >
              Signup
            </button>
            <p className="mt-4 text-m text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
        <div style={imageStyle} className="bg-gray-100"></div>
      </div>
    </div>
  );
};

export default Signup;
