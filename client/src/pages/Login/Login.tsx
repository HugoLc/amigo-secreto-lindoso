import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.scss";
import { encryptPassword } from "../../utils/utils";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const storageToken = useMemo<string | null>(() => {
    const token = localStorage.getItem("amigoSecretoToken");
    return token ? token : null;
  }, []);

  const [hasValidToken, setHasValidToken] = useState(false);

  const checkToken = async () => {
    try {
      console.log("entrou try");
      const response = await api.get("/checktoken", {
        headers: {
          Authorization: `${storageToken}`,
        },
      });
      console.log("response");
      console.log(response);
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  useEffect(() => {
    console.log("AQUI");
    const validateToken = async () => {
      if (storageToken) {
        console.log("entrou if");
        const isValid = await checkToken();

        setHasValidToken(isValid);
      }
    };

    validateToken();
  }, [storageToken]);

  useEffect(() => {
    console.log({ hasValidToken });
  }, [hasValidToken]);

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
      localStorage.setItem("amigoSecretoToken", data.token);
      navigate(`/amigo-secreto/${username}`);
    } catch (error: any) {
      alert("Acesso Negado");
      console.error("ERROU", error.message);
    }
  };

  if (hasValidToken) {
    navigate("/amigo-secreto/front");
    return <></>;
  }

  return (
    <main className={styles["main-login"]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles["form-login"]}>
          <h1>Acesse sua página</h1>
          <div className={styles["form-line"]}>
            <label htmlFor="username">Usuário:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className={styles["form-line"]}>
            <label htmlFor="password">Senha:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit">Entrar</button>
        </Form>
      </Formik>
    </main>
  );
};
export default Login;
