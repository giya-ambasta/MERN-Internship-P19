import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const [eventsByModel, setEventsByModel] = useState({});
  const navigate = useNavigate();

  const handleEdit = (eventId, model) => {
    navigate(`/event/edit/${eventId}/${model}`);
  };

  const handleDelete = async (eventId, model) => {
    try {
      const response = await axios.delete(
        `/api/event/${model}/delete/${eventId}`
      );
      if (response.status === 200) {
        // Update the data by refetching
        fetchData();
        navigate("/dashboard");
      } else {
        throw new Error("Error deleting profile");
      }
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  const fetchData = async () => {
    try {
      const eventModels = [
        "birthday",
        "concert",
        "wedding",
        "corporate",
        "educationalInstitution",
        "custom",
      ];

      const eventsByModel = {};
      for (const model of eventModels) {
        const response = await axios.get(`/api/event/${model}`);
        eventsByModel[model] = response.data.results;
      }

      setEventsByModel(eventsByModel);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={wrapperStyle} className="bg-gray-200">
      <div className="h-fit w-screen">
        <nav className="space-x-4 font-poppins text-xl flex justify-center items-center gap-3">
          <span className="text-red-500 text-2xl font-bold ">
            Plan your Event
          </span>
          <Link to="/event/birthday/birthday">Birthdays</Link>
          <Link to="/event/concert/concert">Concerts</Link>
          <Link to="/event/wedding/wedding">Weddings</Link>
          <Link to="/event/corporate/corporate">Corporates</Link>
          <Link to="/event/educational/educationalInstitution">
            Educational
          </Link>
          <Link to="/event/custom/custom">Custom</Link>
        </nav>
        <div className="mt-4 p-2 w-full px-8 py-2">
          <p className="text-2xl text-red-600 font-bold mb-4">Your events</p>
          {Object.keys(eventsByModel).map((model) => (
            <div key={model} className="ml-10 mb-10">
              <p className="text-xl text-red-600 font-semibold">
                {model.charAt(0).toUpperCase() + model.slice(1)} Events:
              </p>
              {eventsByModel[model].map((event) => (
                <div
                  key={event._id}
                  className="p-2 bg-white grid w-[300px] rounded-lg"
                >
                  <img
                    src={event.posterPath || "/src/assets/event.jpg"}
                    alt=""
                    className="rounded-lg aspect-video"
                  />
                  <div className="p-2 flex flex-col justify-between gap-4">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <div>
                          <p
                            className="text-xl font-bold text-ellipsis overflow-hidden line-clamp-1"
                            title={event.eventName}
                          >
                            {event.eventName}
                          </p>
                          <p
                            className="text-lg text-gray-700 line-clamp-1"
                            title={event.description}
                          >
                            {event.description}
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                clipRule="evenodd"
                              />
                            </svg>

                            {new Date(event.startDate).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                clipRule="evenodd"
                              />
                            </svg>

                            {new Date(event.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {event.location}
                      </div>
                    </div>
                    <div className="flex justify-between text-lg gap-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue w-full"
                        onClick={() => handleEdit(event._id, model)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue w-full"
                        onClick={() => handleDelete(event._id, model)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
