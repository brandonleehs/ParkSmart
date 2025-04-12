import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthWrapper";

export default function About() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(
    "We are a team of passionate developers dedicated to creating a platform that helps users find available carparks quickly and easily.",
  );
  const [missionText, setMissionText] = useState(
    "Our mission is to provide a seamless experience for users to locate and reserve parking spaces, reducing stress and saving time. We also wish to provide a space where users can share their thoughts, ideas, and experiences while also having fun and learning from each other.",
  );

  const handleSave = async () => {
    try {
      const serverUrl = process.env.SERVER_URL
        ? process.env.SERVER_URL
        : `http://localhost:${process.env.PORT}`;

      const response = await fetch(`${serverUrl}/api/about-mission/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aboutText, missionText }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error updating About and Mission. Please try again.");
        return;
      }

      // Update the frontend or context with the updated data if needed
      alert("About and Mission updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating About and Mission:", error);
      alert("Error updating About and Mission. Please try again.");
    }
  };

  useEffect(() => {
    const serverUrl = process.env.SERVER_URL
      ? process.env.SERVER_URL
      : `http://localhost:${process.env.PORT}`;

    fetch(`${serverUrl}/api/about-mission/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.aboutText) setAboutText(data.aboutText);
        if (data.missionText) setMissionText(data.missionText);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
          About Us
        </h1>
        {isEditing && user && user.username === "admin" ? (
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="mb-4 rounded border border-gray-300 p-2"
          />
        ) : (
          <p className="mb-8 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300">
            {aboutText}
          </p>
        )}

        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
          Mission
        </h2>
        {isEditing && user && user.username === "admin" ? (
          <textarea
            value={missionText}
            onChange={(e) => setMissionText(e.target.value)}
            className="mb-4 rounded border border-gray-300 p-2"
          />
        ) : (
          <p className="mb-8 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300">
            {missionText}
          </p>
        )}

        {user && user.username === "admin" && (
          <button
            onClick={() => {
              if (isEditing) {
                handleSave(); // Save changes if in edit mode
              }
              setIsEditing(!isEditing); // Toggle edit mode
            }}
            className="mt-4 rounded-md bg-blue-500 p-2 text-white"
          >
            {isEditing ? "Save Changes" : "Edit About & Mission"}
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
