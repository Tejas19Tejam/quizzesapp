import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("You are using the context outside the provider");
  return context;
};
