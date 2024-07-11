import { useState } from "react";
import loginImage from "../../assets/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/login/", { email, password })
      .then((result) => {
        const fullRegistration = result.data.result.fullRegistration;
        if (fullRegistration === false) {
          navigate("/user/additionalForm");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          setError(err.response.data.errorMessage);
        } else {
          setError("Invalid email or password. Please try again.");
        }
      });
  };
  const wrapperStyle = {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle = {
    display: "flex",
    height: "70vh",
    width: "60vw",
  };

  const imageStyle = {
    flex: "1",
    background: `url(${loginImage}) center/contain no-repeat`,
    backgroundColor: "#fff",
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

  return (
    <div style={wrapperStyle} className="bg-gray-200">
      <div
        className="rounded-2xl shadow-2xl overflow-hidden"
        style={containerStyle}
      >
        <div style={imageStyle} className="bg-gray-100"></div>

        <div style={formStyle}>
          <form
            onSubmit={HandleSubmit}
            className="h-full w-full p-10 flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-6">Login</h2>
            <label
              htmlFor="email"
              className="block text-m font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder=""
              onChange={(e) => setemail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="block text-m font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder=""
              onChange={(e) => setpassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 mb-4" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white mt-2 py-2 px-4 w-full rounded"
            >
              Login
            </button>
            <p className="mt-4 text-m text-gray-600">
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
