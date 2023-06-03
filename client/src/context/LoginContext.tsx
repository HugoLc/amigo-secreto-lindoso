import React, { createContext, useEffect, useMemo, useState } from "react";
import api from "../service/api";

type ILoginContext = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginContext = createContext<ILoginContext | undefined>(undefined);

const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const storageToken = useMemo<string | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const { token } = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return token;
    }
    return null;
  }, []);

  const checkToken = async () => {
    try {
      const response = await api.get("/checktoken", {
        headers: {
          Authorization: `${storageToken}`,
        },
      });
      console.log(response);
      setIsLogged(true);
    } catch (error: any) {
      console.log(error.message);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContextProvider };
export default LoginContext;
