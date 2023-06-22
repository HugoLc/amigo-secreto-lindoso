import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import { Helmet } from "react-helmet";
import styles from "./ParticipantePage.module.scss";
import AmigoInfo from "../../components/AmigoInfo/AmigoInfo";
import FormSugestao from "../../components/FormSugestao/FormSugestao";
import LoginContext from "../../context/LoginContext";
export interface IStorage {
  username: string;
  token: string;
}

export interface IAmigoSecreto {
  nome: string;
  telefone?: string;
  sugestaoPresente?: string;
}

const ParticipantePage = () => {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);
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
  const [participanteInfo, setParticipanteInfo] = useState<
    IAmigoSecreto | null | undefined
  >({
    nome: "",
  });

  const [isSugestao, setIsSugestao] = useState(false);

  const { id } = useParams<{ id: string }>();

  const getAmigoSecreto = async () => {
    try {
      const response = await api.get(`/pagina/${id}/amigo-secreto`, {
        headers: {
          Authorization: `${storageValue?.token}`,
        },
      });
      const data = await response.data;
      setAmigoInfo(data.amigoSecreto);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setAmigoInfo(undefined);
      } else {
        setAmigoInfo(null);
      }
    }
  };
  const getParticipante = async () => {
    try {
      const response = await api.get(
        `/participante/${id}` /* , {
        headers: {
          Authorization: `${storageValue?.token}`,
        },
      } */
      );
      const data = await response.data;
      setParticipanteInfo(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setParticipanteInfo(undefined);
      } else {
        setParticipanteInfo(null);
      }
    }
  };

  useEffect(() => {
    getAmigoSecreto();
    getParticipante();
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
        {loginContext?.roles?.includes(0) ||
          (loginContext?.roles?.includes(1) && (
            <button onClick={() => navigate("/dashboard/" + id)}>Admin</button>
          ))}
        <div className={styles["participante-box"]}>
          {!isSugestao ? (
            <AmigoInfo
              amigoInfo={amigoInfo}
              styles={styles}
              userId={id as string}
              setIsSugestao={setIsSugestao}
            />
          ) : (
            <FormSugestao
              setIsSugestao={setIsSugestao}
              participanteInfo={participanteInfo as IAmigoSecreto}
              token={storageValue?.token}
              styles={styles}
              userId={id as string}
            />
          )}
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
      {loginContext?.roles?.includes(0) ||
        (loginContext?.roles?.includes(1) && (
          <button onClick={() => navigate("/dashboard/" + id)}>Admin</button>
        ))}
      <div className={styles["participante-box"]}>
        {!isSugestao ? (
          <AmigoInfo
            styles={styles}
            userId={id as string}
            setIsSugestao={setIsSugestao}
          />
        ) : (
          <FormSugestao
            participanteInfo={participanteInfo as IAmigoSecreto}
            setIsSugestao={setIsSugestao}
            token={storageValue?.token}
            styles={styles}
            userId={id as string}
          />
        )}
      </div>
    </main>
  );
};

export default ParticipantePage;
