import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const isAdmin =
    localStorage.getItem("is_admin");

  if (isAdmin !== "true") {

    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;