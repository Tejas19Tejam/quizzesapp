import { createContext, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../services/axios";
import { toast } from "react-toastify";
import useAuthToken from "../../hooks/useAuthToken";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token, saveToken, removeToken } = useAuthToken();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // 2) If there is an token add it as authorization header to request for authenticate
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useEffect(() => {
    // 1) Check if there is a token if not then navigate user to auth page
    if (!token) return navigate("/auth", { replace: true });

    // 3) Check the response from server
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error || {};
        const status = response?.status;

        if (status === 401 || status === 403 || status === 500) {
          toast.warning("You are not logged in ! Please login to get access.");
          removeToken();
          navigate("/auth", { replace: true });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [token, navigate, removeToken]);

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
