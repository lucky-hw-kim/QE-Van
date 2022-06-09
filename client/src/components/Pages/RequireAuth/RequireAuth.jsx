import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const token = auth.accessToken;
  const location = useLocation;
  token ?  <Navigate to="/login" /> : <Outlet />;
}

export default RequireAuth;
