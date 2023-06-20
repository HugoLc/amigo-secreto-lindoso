import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IAmigoSecreto } from "../../pages/ParticipantePage/ParticipantePage";
import { Link } from "react-router-dom";
import api from "../../service/api";

interface IProps {
  participanteInfo: IAmigoSecreto;
  styles: {
    [key: string]: string;
  };
  userId: string;
  token: string | undefined;
  setIsSugestao: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSugestao = ({
  styles,
  participanteInfo,
  setIsSugestao,
  token,
  userId,
}: IProps) => {
  const handleSubmit = async (values: any) => {
    const payload = {
      sugestaoPresente: values.suggestion,
    };

    try {
      await api.patch(`/atualizar/${userId}`, payload, {
        headers: {
          Authorization: `${token}`,
        },
      });
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const initialValues = {
    name: userId,
    suggestion: participanteInfo?.sugestaoPresente || "",
  };

  const validateForm = (values: any) => {
    const errors: any = {};

    if (!values.suggestion) {
      errors.suggestion = "Campo obrigatório";
    } else {
      values.suggestion = values.suggestion;
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      <Form className={styles["form-cadastro"]}>
        <div className={styles["form-line"]}>
          <label htmlFor="name">Nome:</label>
          <Field type="text" id="name" name="name" disabled={true} />
        </div>

        <div className={styles["form-line"]}>
          <label htmlFor="suggestion">Sugestão de presente:</label>
          <Field as="textarea" id="suggestion" name="suggestion" />
          <ErrorMessage name="suggestion" component="span" />
        </div>

        <div className={`${styles["btn-wrapper"]} ${styles["space"]}`}>
          <button type="submit">Enviar</button>
          <button onClick={() => setIsSugestao(false)}>Voltar</button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormSugestao;
