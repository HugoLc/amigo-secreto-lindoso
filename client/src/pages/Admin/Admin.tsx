import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IStorage } from "../ParticipantePage/ParticipantePage";
import api from "../../service/api";
import ParticipnteItemForm from "../../components/ParticipanteItemForm/ParticipnteItemForm";
import styles from "./Admin.module.scss";
export interface IParticipante {
  nome: string;
  telefone: string;
  roles: number[];
  confirmado: boolean;
}

const Admin = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [listaParticipantes, setListaParticipantes] =
    useState<IParticipante[]>();

  const storageValue = useMemo<IStorage | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const value = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return value;
    }
    return null;
  }, []);

  const { admin } = useParams<{ admin: string }>();

  const getDashboard = async () => {
    try {
      const response = await api.get(`/dashboard/${admin}`, {
        headers: {
          Authorization: `${storageValue?.token}`,
        },
      });
      const data = await response.data;
      setIsAdmin(data?.isAdmin);
      data?.listaParticipantes &&
        setListaParticipantes(data.listaParticipantes);
    } catch (error: any) {
      console.log("ERRO dashboard", error.message);
      setIsAdmin(false);
    }
  };
  const handleSortear = async () => {
    try {
      await api.get(`/sortear/${storageValue?.username}`, {
        headers: {
          Authorization: `${storageValue?.token}`,
        },
      });
      // window.location.reload();
      alert("Sorteio realizado");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (isAdmin) {
    return (
      <main className={styles["main-admin"]}>
        <button onClick={() => navigate("/amigo-secreto/" + admin)}>
          Voltar
        </button>
        <div className={styles["participantes-container"]}>
          <div className={styles["header-participantes"]}>
            <h1>Participantes</h1>
            <button onClick={handleSortear}>Sortear</button>
          </div>
          <ul>
            {listaParticipantes &&
              listaParticipantes.map((participante) => (
                <ParticipnteItemForm
                  participante={participante}
                  token={storageValue?.token}
                  styles={styles}
                />
              ))}
          </ul>
        </div>
      </main>
    );
  } else if (isAdmin === false) {
    navigate("/");
  }
  return null;
};

export default Admin;
