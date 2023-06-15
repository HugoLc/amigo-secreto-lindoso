import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import { Helmet } from "react-helmet";
import styles from "./ParticipantePage.module.scss";
import Logout from "../../components/Header/Logout";

export interface IStorage {
  username: string;
  token: string;
}

interface IAmigoSecreto {
  nome: string;
  telefone?: string;
  sugestaoPresente?: string;
}

const ParticipantePage = () => {
  const navigate = useNavigate();
  const storageValue = useMemo<IStorage | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const value = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return value;
    }
    return null;
  }, []);

  const [amigoInfo, setAmigoInfo] = useState<IAmigoSecreto | null | undefined>({
    nome: "",
  });
  const { id } = useParams<{ id: string }>();

  const getAmigoSecreto = async () => {
    try {
      const response = await api.get(`/pagina/${id}/amigo-secreto`, {
        headers: {
          Authorization: `${storageValue?.token}`,
        },
      });
      const data = response.data;
      setAmigoInfo(data.amigoSecreto);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setAmigoInfo(undefined);
      } else {
        setAmigoInfo(null);
      }
    }
  };

  useEffect(() => {
    getAmigoSecreto();
  }, []);

  if (amigoInfo?.nome === "") return null;

  if (amigoInfo) {
    return (
      <main className={styles["main-participante"]}>
        <Helmet>
          <title>Amigo secreto | {id}</title>
        </Helmet>
        <img
          className="logo logo-mini"
          src="/assets/amigo-secreto.svg"
          alt=""
        />

        <div className={styles["participante-box"]}>
          <h1 className={styles["title-participante"]}>Olá, {id}! </h1>
          <div className={styles["text-container"]}>
            <p className={styles["text-participante"]}>
              O sorteio já rolou seu presente será para:
            </p>
            <p className={styles["text-participante__highlight"]}>
              {amigoInfo.nome}!
            </p>
            {amigoInfo.sugestaoPresente ? (
              <>
                <p className={styles["text-participante"]}>E o pedido foi:</p>
                <p className={styles["text-participante__highlight"]}>
                  {amigoInfo.nome}!
                </p>
                <p className={styles["text-participante"]}>
                  A troca de presentes será dia:
                </p>
                <p className={styles["text-participante__highlight"]}>25/12</p>
                <p className={styles["text-participante"]}>E o local será:</p>
                <p className={styles["text-participante__highlight"]}>
                  Casa da Tia Maria
                </p>
              </>
            ) : (
              <p
                className={styles["text-participante"]}
              >{`Seu amigo secreto não deixou uma sugestão de presente. :(`}</p>
            )}
            <div className={styles["btn-wrapper"]}>
              <Logout className="btn-sair" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (amigoInfo === undefined) {
    console.log(`Você não tem acesso à página de ${id}`);
    navigate("/login");
    return null;
  }

  return (
    <main className={styles["main-participante"]}>
      <Helmet>
        <title>Amigo secreto | {id}</title>
      </Helmet>
      <img className="logo logo-mini" src="/assets/amigo-secreto.svg" alt="" />
      <div className={styles["participante-box"]}>
        <h1 className={styles["title-participante"]}>Olá, {id}!</h1>
        <div className={styles["text-container"]}>
          <p className={styles["text-participante"]}>
            O sorteio ainda não aconteceu, volte em breve!
          </p>
          <div className={styles["btn-wrapper"]}>
            <Logout className="btn-sair" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ParticipantePage;
