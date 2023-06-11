import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IStorage } from "../ParticipantePage/ParticipantePage";
import api from "../../service/api";

interface IListaParticipantes {
  nome: string;
  telefone: string;
  roles: number[];
}

const Admin = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [listaParticipantes, setListaParticipantes] =
    useState<IListaParticipantes[]>();

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
      console.log("data", data);
      setIsAdmin(data?.isAdmin);
      data?.listaParticipantes &&
        setListaParticipantes(data.listaParticipantes);
    } catch (error: any) {
      console.log("ERRO dashboard", error.message);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (isAdmin) {
    return (
      <div>
        Participantes
        <ul>
          {listaParticipantes &&
            listaParticipantes.map((participante) => (
              <li>
                <span>{participante.nome} | </span>
                <span>{participante.telefone} | </span>
                <span>{JSON.stringify(participante.roles)} </span>
              </li>
            ))}
        </ul>
      </div>
    );
  } else if (isAdmin === false) {
    navigate("/");
  }
  return null;
};

export default Admin;
