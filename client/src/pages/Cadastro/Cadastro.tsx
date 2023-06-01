import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import CryptoJS from "crypto-js";
import api from "../../service/api";

const Cadastro: React.FC = () => {
  const initialValues = {
    name: "",
    password: "",
    phone: "",
    suggestion: "",
  };

  const handleSubmit = async (values: any) => {
    const { name, password, phone, suggestion } = values;
    const criptSenha = encryptPassword(
      password,
      process.env.REACT_APP_SECRET_AES as string
    );
    const payload = {
      nome: name,
      senha: criptSenha,
      telefone: phone,
      sugestaoPresente: suggestion,
    };
    try {
      await api.post("/cadastrar", payload);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const encryptPassword = (password: string, secretKey: string): string => {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretKey
    ).toString();
    return encryptedPassword;
  };

  const validateForm = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "Nome é obrigatório";
    } else {
      values.name = values.name.toLowerCase();
    }

    if (!values.password) {
      errors.password = "Senha é obrigatória";
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,10}$/.test(values.password)) {
      errors.password =
        "Senha deve conter entre 6 e 10 caracteres, incluindo letras e números";
    }

    if (!values.phone) {
      errors.phone = "Telefone é obrigatório";
    }

    return errors;
  };

  return (
    <main className={styles["main-cadastro"]}>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        <Form className={styles["form-cadastro"]}>
          <h1>Participe do amigo secreto 2023</h1>
          <div className={styles["form-line"]}>
            <label htmlFor="name">Nome:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div className={styles["form-line"]}>
            <label htmlFor="password">Senha:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div className={styles["form-line"]}>
            <label htmlFor="phone">Telefone:</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div className={styles["form-line"]}>
            <label htmlFor="suggestion">Sugestão de presente:</label>
            <Field as="textarea" id="suggestion" name="suggestion" />
          </div>

          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </main>
  );
};

export default Cadastro;
