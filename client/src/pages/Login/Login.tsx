import React, { useContext, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.scss";
import { encryptPassword } from "../../utils/utils";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import { Helmet } from "react-helmet";

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Usuário é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const Login: React.FC = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const storageToken = useMemo<string | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const { token } = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return token;
    }
    return null;
  }, []);

  const [hasValidToken, setHasValidToken] = useState(false);

  const checkToken = async () => {
    try {
      const response = await api.get("/checktoken", {
        headers: {
          Authorization: `${storageToken}`,
        },
      });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      if (storageToken) {
        const isValid = await checkToken();
        setHasValidToken(isValid);
      }
    };

    validateToken();
  }, [storageToken]);

  const handleSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;
    const criptSenha = encryptPassword(
      password,
      process.env.REACT_APP_SECRET_AES as string
    );
    const payload = {
      nome: username,
      senha: criptSenha,
    };
    try {
      const response = await api.post("/login", payload);
      const data = response.data;
      localStorage.setItem(
        "amigoSecretoToken",
        JSON.stringify({ username, token: data.token })
      );
      loginContext?.setIsLogged(true);
      window.location.pathname = `/amigo-secreto/${username}`;
    } catch (error: any) {
      alert("Acesso Negado");
      console.error("ERROU", error.message);
    }
  };

  if (hasValidToken) {
    const { username } = JSON.parse(
      localStorage.getItem("amigoSecretoToken") as string
    );
    loginContext?.setIsLogged(true);
    navigate(`/amigo-secreto/${username}`);
    return <></>;
  }

  return (
    <main className={styles["main-login"]}>
      <Helmet>
        <title>Amigo secreto</title>
      </Helmet>
      <img className="logo" src="/assets/amigo-secreto.svg" alt="" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles["form-login"]}>
          <h1>Olá, digite seus dados para entrar ou clique em cadastrar:</h1>
          <div className={styles["form-line"]}>
            <label htmlFor="username">Usuário:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage
              className={styles["error-label"]}
              name="username"
              component="div"
            />
          </div>

          <div className={styles["form-line"]}>
            <label htmlFor="password">Senha:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              className={styles["error-label"]}
              name="password"
              component="div"
            />
          </div>

          <div className={styles["buttons-wrapper"]}>
            <button type="submit">Entrar</button>
            <button onClick={() => navigate(`/cadastro`)}>Cadastrar</button>
          </div>
        </Form>
      </Formik>
    </main>
  );
};
export default Login;
