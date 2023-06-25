import React, { useEffect, useState } from "react";
import api from "../../service/api";

interface IParticipante {
  _id: string;
  nome: string;
  amigoSecreto: string;
}

const ListaParticipantes = () => {
  const [participantes, setParticipantes] = useState<IParticipante[]>();
  const getParticipante = async () => {
    try {
      const response = await api.get(`/test-sorteio`);
      const data = await response.data;
      setParticipantes(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getParticipante();
  }, []);

  if (!participantes) return null;
  return (
    <div>
      Resultado do sorteio:
      <ul>
        {participantes &&
          participantes.map((participante) => (
            <li key={participante._id}>
              <strong>{participante.nome}</strong> tirou{" "}
              <strong>{participante.amigoSecreto}</strong>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListaParticipantes;
