import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";

interface IStorage {
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
      <main>
        <h1>Olá, {id}</h1>
        <p>Seu amigo secreto é: {amigoInfo.nome}</p>
        {amigoInfo.sugestaoPresente ? (
          <p>A sugestão de presente para ele é: {amigoInfo.sugestaoPresente}</p>
        ) : (
          <p>{`Seu amigo secreto não deixou uma sugestão de presente. :(`}</p>
        )}
      </main>
    );
  }

  if (amigoInfo === undefined) {
    console.log(`Você não tem acesso à página de ${id}`);
    navigate("/login");
    return null;
  }

  return (
    <main>
      <h1>Olá, {id}</h1>
      <p>
        Seu amigo secreto ainda não foi sorteado. Aguarde a data do sorteio.
      </p>
    </main>
  );
};

export default ParticipantePage;
