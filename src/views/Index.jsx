import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthWrapper";

export default function Index() {
  const { user } = useContext(AuthContext);
  // No visual changes needed for Index.jsx as it's a routing component that redirects
  // Dark mode will be handled by the components it redirects to
  return user ? <Navigate to="/home" /> : <Navigate to="/login" />;
}
