import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./Cadastro.module.scss";
import CryptoJS from "crypto-js";
import api from "../../service/api";
import { encryptPassword } from "../../utils/utils";
import MessageModal from "../../components/MessageModal/MessageModal";

const Cadastro: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean | undefined>();
  const [isSucces, setIsSucces] = useState<boolean | undefined>();
  const [modalMsg, setModalMsg] = useState<string>("");

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
      const response = await api.post("/cadastrar", payload);
      setIsSucces(true);
      setModalMsg("Cadastrado com sucesso!");
      window.location.reload();
    } catch (error: any) {
      setIsSucces(false);
      if (error.response.data.message.includes("duplicate")) {
        setModalMsg("Erro no cadastro. Usuario já cadastrado");
      } else {
        setModalMsg("Erro no cadastro. Tente novamente!");
      }
      console.error(error);
    }
    setShowModal(true);
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
      <MessageModal
        isSucces={isSucces}
        message={modalMsg}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
