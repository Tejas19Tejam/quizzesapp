import { useState, useEffect } from "react";

const useAuthToken = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("access_token");
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "access_token") {
        setToken(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);

  const saveToken = (newToken) => {
    setToken(newToken);
  };

  const removeToken = () => {
    setToken(null);
  };

  return {
    token,
    saveToken,
    removeToken,
  };
};

export default useAuthToken;
