import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import Index from "./views/Index";
import SearchPage from "./views/SearchPage";
import LoadingPage from "./views/LoadingPage";
import PostDetail from "./views/PostDetail";
// import EditPost from "./views/EditPost";
import FeedbackPage from "./views/FeedbackPage";
import AdminDashboard from "./views/AdminDashboard";
import ProfilePage from "./views/ProfilePage";
import LicensePage from "./views/LicensePage";
import Forum from "./views/Forum";
import About from "./views/About";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index></Index>,
    },
    {
      path: "signup",
      element: <SignUpPage></SignUpPage>,
    },
    {
      path: "login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "home",
      element: <HomePage></HomePage>,
    },
    {
      path: "searchpage",
      element: <SearchPage></SearchPage>,
    },
    {
      path: "loading",
      element: <LoadingPage></LoadingPage>,
    },
    {
      path: "forum",
      element: <Forum />,
    },
    {
      path: "forum/post/:id",
      element: <PostDetail />,
    },
    {
      path: "support",
      element: <FeedbackPage />,
    },
    {
      path: "support/admin",
      element: <AdminDashboard />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "license",
      element: <LicensePage />,
    },
    {
      path: "about",
      element: <About />,
    },
    // Catch-all route for invalid paths and redirect to home
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
