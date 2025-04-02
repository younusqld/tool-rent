import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get("/profile", {
          headers: { Authorization: token },
        });

        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect to login if there's no valid token or user data
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return { userData, loading };
}

export default useUserData;