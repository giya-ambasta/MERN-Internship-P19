import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

const EventCreate = () => {
  const { model } = useParams();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [loading, setLoading] = useState(true);

  const fieldLabelMapping = {
    eventName: "Event Name",
    description: "Description",
    startDate: "Start Date",
    endDate: "End Date",
    location: "Location",
    posterPath: "Poster Path",
    hallOwner: "Hall Owner",
    performer: "Performer",
    catering: "Catering",
    musician: "Musician",
    decorator: "Decorator",
  };

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get(`/api/event/${model}/get`);
        const { success, result, message } = response.data;

        if (success) {
          setFormFields(result);
          setLoading(false);
        } else {
          console.error(message || "Error fetching form fields");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching form fields:", error);
        setLoading(false);
      }
    };

    fetchFormFields();
  }, [model]);

  useEffect(() => {
    const fieldsRequiringAdditionalData = [
      "hallOwner",
      "performer",
      "catering",
      "musician",
      "decorator",
    ];

    fieldsRequiringAdditionalData.forEach((fieldName) => {
      const field = formFields.find((field) => field.name === fieldName);
      if (field && field.type === "unknown") {
        fetchAdditionalData(fieldName);
      }
    });
  }, [formFields]);

  const fetchAdditionalData = async (fieldName) => {
    try {
      const response = await axios.get(`/api/user/${fieldName.toLowerCase()}`);
      const { success, results, message } = response.data;

      if (success) {
        setAdditionalData((prevData) => ({
          ...prevData,
          [fieldName]: results,
        }));
      } else {
        console.error(
          `Error fetching additional data for ${fieldName}:`,
          message
        );
      }
    } catch (error) {
      console.error(`Error fetching additional data for ${fieldName}:`, error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.post(`/api/event/${model}/create`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        console.error(err.response.data.errorMessage);
      } else {
        console.error("Error submitting the form. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-5 mx-20">
      <div className="container mx-auto">
        <h1 className="text-2xl text-center mb-5">Create Event</h1>

        {loading && <p>Loading...</p>}

        {!loading && (
          <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={field.name}
                >
                  {fieldLabelMapping[field.name] || field.name}
                </label>
                {field.name === "posterPath" ? (
                  <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    onChange={(e) => handleFileChange(field.name, e)}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : field.type === "text" ? (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={`Enter ${
                      fieldLabelMapping[field.name] || field.name
                    }`}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  />
                ) : field.type === "date" ? (
                  <input
                    type="date"
                    id={field.name}
                    name={field.name}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  />
                ) : field.type === "unknown" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">
                      Select {fieldLabelMapping[field.name] || field.name}
                    </option>
                    {Array.isArray(additionalData[field.name]) &&
                      additionalData[field.name].length > 0 &&
                      additionalData[field.name].map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.firstName}
                        </option>
                      ))}
                  </select>
                ) : null}
              </div>
            ))}

            <div className="col-span-2 mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventCreate;
