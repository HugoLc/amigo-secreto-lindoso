import React, { createContext, useEffect, useMemo, useState } from "react";
import api from "../service/api";

type ILoginContext = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  roles: number[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<number[] | undefined>>;
};

const LoginContext = createContext<ILoginContext | undefined>(undefined);

const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [roles, setRoles] = useState<number[] | undefined>();
  const storageToken = useMemo<string | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const { token } = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return token;
    }
    return null;
  }, []);
  const storageUser = useMemo<string | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const { username } = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return username;
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
      setIsLogged(true);
    } catch (error: any) {
      console.log(error.message);
      setIsLogged(false);
    }
  };
  const getRoles = async () => {
    try {
      const response = await api.get(`/roles/${storageUser}`, {
        headers: {
          Authorization: `${storageToken}`,
        },
      });
      const data = await response.data;
      setRoles(data?.roles);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkToken();
    getRoles();
  }, []);
  useEffect(() => {
    if (isLogged) {
      getRoles();
    }
  }, [isLogged]);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, roles, setRoles }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContextProvider };
export default LoginContext;
