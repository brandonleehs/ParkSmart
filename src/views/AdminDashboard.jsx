// pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from "react";
import FeedbackStats from "../components/admin/FeedbackStats";
import FeedbackTable from "../components/admin/FeedbackTable";
import ReportTable from "../components/admin/ReportTable";
import axios from "axios";
import "../styles/AdminDashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../auth/AuthWrapper";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]); // State to hold reports data

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true);
      try {
        const serverUrl = process.env.SERVER_URL
          ? process.env.SERVER_URL
          : `http://localhost:${process.env.PORT}`;

        // Request feedback data from the backend API using Axios
        const response = await axios.get(`${serverUrl}/api/feedbacks`);

        setFeedbackData(response.data || []); // Safeguard: default to empty array if response is invalid
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("An error occurred while fetching feedback data");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const serverUrl = process.env.SERVER_URL
          ? process.env.SERVER_URL
          : `http://localhost:${process.env.PORT}`;

        const response = await axios.get(`${serverUrl}/api/reports`);

        setReports(response.data || []); // Safeguard: default to empty array if response is invalid
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("An error occurred while fetching reports data");
      }
    };

    fetchReports();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // If not logged in, redirect immediately
      navigate("/login"); // Redirect to login or another route
    } else if (user && user.username !== "admin") {
      // If logged in but not an admin, redirect after a short delay
      const timeout = setTimeout(() => {
        navigate("/home"); // Redirect to home or another route
      }, 2000);

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [user, navigate]);

  // Safeguard against unexpected non-array values
  const totalCount = Array.isArray(feedbackData) ? feedbackData.length : 0;
  const avgRating =
    totalCount > 0
      ? (
          feedbackData.reduce((sum, item) => sum + (item.rating || 0), 0) /
          totalCount
        ).toFixed(1)
      : 0;

  if (!user || user.username !== "admin") {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold text-red-600 dark:text-red-400">
            403 - Access Denied
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            You don't have permission to access this page. Redirecting...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-auto bg-gray-50 dark:bg-gray-800">
        <section className="admin-section mx-auto max-w-6xl px-4 py-8">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Feedback Dashboard
          </h1>

          {loading ? (
            <p className="text-center text-gray-700 dark:text-gray-300">
              Loading feedback data...
            </p>
          ) : error ? (
            <p className="error-message text-center text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : (
            <>
              <FeedbackStats totalCount={totalCount} avgRating={avgRating} />
              <FeedbackTable feedbackData={feedbackData} />
              <ReportTable reports={reports} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
