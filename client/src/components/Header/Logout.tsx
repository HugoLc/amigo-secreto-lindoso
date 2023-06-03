import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

const Logout = () => {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  const handleLogout = (): void => {
    localStorage.removeItem("amigoSecretoToken");
    loginContext?.setIsLogged(false);
    navigate("/login");
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
