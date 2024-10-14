import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state?.tokenWithUserRole);

  // Check if token exists, if not redirect to the login page ("/register")
  return token ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
