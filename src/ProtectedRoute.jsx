import { Navigate, Outlet } from "react-router";
import { useAppContext } from "./context/AppContext";

const ProtectedRoute = () => {
  const { gameStarted } = useAppContext();

  return gameStarted ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;