import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelector((state) => state.user);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
