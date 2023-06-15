import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

interface IProps {
  className?: string | undefined;
}

const Logout = ({ className }: IProps) => {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  const handleLogout = (): void => {
    localStorage.removeItem("amigoSecretoToken");
    loginContext?.setIsLogged(false);
    navigate("/login");
  };
  return (
    <button className={className} onClick={handleLogout}>
      Sair
    </button>
  );
};

export default Logout;
