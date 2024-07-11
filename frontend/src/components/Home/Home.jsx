import { Link } from "react-router-dom";


// Import your hero background image
import heroImage from "../../assets/hero.png";

const Home = () => {
  const containerStyle = {
    height: "80vh",
    width: "90vw",
    position: "relative",
    overflow: "hidden", // Ensure the image doesn't overflow the container
    background: `url(${heroImage}) center/cover no-repeat`, // Set background image
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay color with some transparency
  };

  const textStyle = {
    color: "white",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "49%",
    transform: "translate(-48%, -50%)",
    zIndex: 10,
  };

  const imgH = {
    height: "85vh",
  };

  return (
    <div className="relative flex justify-center items-center" style= {imgH}>
      <div style={containerStyle}>
        <div style={overlayStyle}></div>

        {/* Text Overlay */}
        <div style={textStyle}>
          <h1 className="text-6xl font-extrabold mb-4 ">Plan your event today</h1>
          <p className="text-5xl font-extrabold mb-8">
            with aayojan
          </p>
          <Link
            to="/dashboard"
            className="bg-red-500 hover:bg-red-700 text-white font-semibold text-2xl py-3 px-5 rounded transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
