import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const wrapperStyle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const handleEdit = () => {
    navigate("/user/edit");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/auth/delUser");
      if (response.status !== 204) {
        throw new Error("Error deleting profile");
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/user/me");
        setUserData(response.data.result);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const excludedKeys = [
    "firstName",
    "lastName",
    "type",
    "profilePicPath",
    "__v",
    "userId",
    "_id",
    "createdAt",
    "updatedAt",
  ];
  const fieldLabelMapping = {
    _id: "User ID",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    contactNo: "Contact Number",
    charges: "Charges",
    isAvailable: "Is Available",
    websiteUrl: "Website URL",
    rating: "Rating",
    expreience: "Experience",
    droneService: "Drone Service",
    photoBooth: "Photo Booth Service",
    photoPrint: "Photo Print Service",
  };

  return (
    <div
      style={wrapperStyle}
      className="bg-gray-200 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full mx-40">
        <div className="grid grid-cols-10 items-center mb-4">
          <img
            src={userData?.profilePicPath || "/src/assets/profile.png"}
            alt="Profile"
            className="rounded-full h-20 w-20 object-covera col-span-1"
          />
          <div className="grid items-center col-span-7">
            <h2 className="text-2xl font-bold">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="text-gray-600 text-xl">
              {userData?.type?.charAt(0).toUpperCase()}
              {userData?.type?.slice(1)}
            </p>
          </div>
          <div className="col-span-2 flex justify-end space-x-4">
            <button
              className="border-2 border-slate-500 px-5 py-1.5 rounded-md"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-5 py-1.5 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3">
          {userData &&
            Object.entries(userData).map(([key, value]) => {
              if (!excludedKeys.includes(key)) {
                const label = fieldLabelMapping[key] || key;
                const displayValue =
                  typeof value === "boolean"
                    ? value.toString().charAt(0).toUpperCase() +
                      value.toString().slice(1)
                    : value;
                return (
                  <div key={key} className="text-gray-700 p-4 text-lg">
                    <strong>{label}:</strong> {displayValue}
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
