import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { UseLocalStorage } from "./useLocalStorage";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = UseLocalStorage("user", "");
  const AuthContext = createContext({});
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: {}) => {
    setUser(data);
    navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
