import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const phoneData = localStorage.getItem("phoneData");
    if (phoneData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // If the authentication status is still unknown (null), don't render children yet
  if (isAuthenticated === null) {
    return null; // You can display a loading spinner or placeholder here
  }

  return children;
}
