import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  let navigate = useNavigate();

  const [userData, setUserData] = useState();
  
  const exclusionList = [
    "_id",
    "userId",
    "__v",
    "createdAt",
    "updatedAt",
    "type",
  ];

  const wrapperStyle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const keyLabelMap = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    contactNo: "Contact Number",
    profilePicPath: "Profile Picture Path",
    charges: "Charges",
    isAvailable: "Is Available",
    websiteUrl: "Website URL",
    rating: "Rating",
    expreience: "Experience",
    droneService: "Provides Drone Service",
    photoBooth: "Provides Photo Booth",
    photoPrint: "Provides Photo Print",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/me");
        setUserData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

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

    if (field.name === "profilePicPath") {
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
            checked={userData[field.name] || false}
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
          value={userData[field.name] || ""}
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
        value={userData[field.name] || ""}
        onChange={(e) =>
          handleInputChange(field.name, e.target.value, field.type)
        }
        {...commonProps}
      />
    );
  };

  const renderInputFields = () => {
    return userData
      ? Object.entries(userData).map(
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
                      : "text",
                })}
              </div>
            )
        )
      : null;
  };

  
  
  const handleInputChange = (name, value, type) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));

  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      profilePicPath: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.put("/api/user/me/edit", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
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
        <h2 className="text-3xl text-center mb-5">Edit Profile</h2>
        {userData && (
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
};

export default EditProfile;
