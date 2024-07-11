import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu"; // Import Shadcn UI dropdown components

const Header = () => {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUserData(null);
      navigate('/login')
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/me");
        setUserData(response.data.result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
      <div>
        {/* Link to the home route */}
        <Link to="/" className="text-3xl font-bold font-pacifico text-red-500">
          aayojan
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {userData ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-4">
                <span className="text-xl">{userData.firstName}</span>
                <img
                  src={userData.profilePicPath || "/src/assets/profile.png"}
                  alt="Profile"
                  className="rounded-full h-10 w-10 object-covera"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 p-4 pr-12 bg-white shadow-2xl rounded-md text-lg fixed -right-12">
                <Link
                  to="/profile"
                  className="block p-1 rounded-md w-full text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block p-1 rounded-md w-full text-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          // If user is not logged in, show "Get Started" button
          <Link
            to="/login"
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
