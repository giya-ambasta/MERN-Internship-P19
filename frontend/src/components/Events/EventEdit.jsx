import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EventEdit() {
  const { id } = useParams();
  const { model } = useParams();
  const [eventData, setEventData] = useState({});

  let navigate = useNavigate();

  const wrapperStyle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const exclusionList = ["_id", "organizerId", "__v", "invitationList"];

  const keyLabelMap = {
    eventName: "Event Name",
    description: "Description",
    startDate: "Start Date",
    endDate: "End Date",
    location: "Location",
    posterPath: "Poster Image",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/event/${model}/get/${id}`);
        setEventData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [model, id]);

  const handleInputChange = (name, value, type) => {
    setEventData((prevUserData) => ({
      ...prevUserData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEventData((prevData) => ({
      ...prevData,
      profilePicPath: file,
    }));
  };

  const renderInputFields = () => {
    return eventData
      ? Object.entries(eventData).map(
          ([key, value]) =>
            !exclusionList.includes(key) && (
              <div key={key} className="text-lg p-2 flex flex-col">
                <label htmlFor={key} className="font-bold mr-2">
                  {keyLabelMap[key] || key}
                </label>
                {renderInput({
                  name: key,
                  type:
                    typeof value === "boolean"
                      ? "checkbox"
                      : typeof value === "number"
                      ? "number"
                      : value.includes("T")
                    ? "date"
                      : "text",
                })}
              </div>
            )
        )
      : null;
  };

  const renderInput = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      className: "border-2 border-slate-300 rounded-sm px-2",
    };

    const checkboxProps = {
      id: field.name,
      name: field.name,
      className: "w-4 aspect-square rounded-sm px-2",
    };

    if (field.name === "posterPath") {
      return (
        <input
          type="file"
          onChange={handleFileChange}
          {...commonProps}
          className="border-2 border-slate-300 rounded-sm overflow-hidden"
        />
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={eventData[field.name] || false}
            onChange={(e) =>
              handleInputChange(field.name, e.target.checked, field.type)
            }
            {...checkboxProps}
          />
        </label>
      );
    }

    if (field.type === "number") {
      return (
        <input
          type="number"
          value={eventData[field.name] || ""}
          onChange={(e) =>
            handleInputChange(field.name, e.target.value, field.type)
          }
          {...commonProps}
        />
      );
    }

    if (field.type === "date") {
      // Handle date fields here, you can use a date picker library or an HTML date input
      return (
        <input
          type="date"
          value={
            eventData[field.name] ? eventData[field.name].slice(0, 10) : ""
          }
          onChange={(e) =>
            handleInputChange(field.name, e.target.value, field.type)
          }
          {...commonProps}
        />
      );
    }

    return (
      <input
        type={field.type}
        value={eventData[field.name] || ""}
        onChange={(e) =>
          handleInputChange(field.name, e.target.value, field.type)
        }
        {...commonProps}
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.put(`/api/event/${model}/update/${id}`, eventData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div
      style={wrapperStyle}
      className="bg-gray-200 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full mx-40">
        <h2 className="text-3xl text-center mb-5">Edit Event</h2>
        {eventData && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">{renderInputFields()}</div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EventEdit;
