import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const AdditionalForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get("/api/user/me/details");
        const { success, result, message } = response.data;

        if (success) {
          setFormFields(result);
        } else {
          setError(message || "Error fetching form fields");
        }
      } catch (error) {
        console.error("Error fetching form fields:", error);
      }
    };

    fetchFormFields();
  }, []);

  const fieldLabelMapping = {
    contactNo: "Phone Number",
    profilePicPath: "Profile Picture",
    charges: "Charges",
    isAvailable: "Is Available",
    websiteUrl: "Website URL",
    rating: "Rating",
    expreience: "Experience",
    droneService: "Drone Service",
    photoBooth: "Photo Booth",
    photoPrint: "Photo Print"
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePicPath: file,
    }));
  };

  const renderInput = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      className:
        "p-2 border rounded-md focus:outline-none focus:border-blue-500 w-full",
    };
  
    if (field.name === "profilePicPath") {
      return <input type="file" onChange={handleFileChange} {...commonProps} />;
    }
  
    if (field.type === "checkbox") {
      return (
        <div className="flex">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData[field.name] || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              {...commonProps}
            />
          </label>
        </div>
      );
    }
  
    return (
      <input
        type={field.type}
        value={formData[field.name] || ""}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        {...commonProps}
      />
    );
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.post("/api/user/me/details", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        setError(err.response.data.errorMessage);
      } else {
        setError("Error submitting the form. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" >
        {formFields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-gray-700 font-bold mb-2"
            >
              {fieldLabelMapping[field.name] || field.name}
            </label>
            {renderInput(field)}
          </div>
        ))}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdditionalForm;
