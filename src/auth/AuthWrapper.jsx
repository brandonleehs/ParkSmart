import { createContext, useState, useEffect } from "react";
import LoadingPage from "../views/LoadingPage";

// Create context for user authentication
export const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Check if there's a valid token saved in localStorage to determine the authenticated user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You can send the token to your backend to validate the session

      const serverUrl = process.env.SERVER_URL
        ? process.env.SERVER_URL
        : `http://localhost:${process.env.PORT}`;

      fetch(`${serverUrl}/api/auth/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in request headers
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user); // Set user if the token is valid
          } else {
            throw new Error("Invalid token!");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
