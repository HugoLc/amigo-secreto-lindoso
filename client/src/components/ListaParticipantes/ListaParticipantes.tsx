import React, { useEffect, useState } from "react";
import api from "../../service/api";

interface IParticipante {
  _id: string;
  nome: string;
}

const ListaParticipantes = () => {
  const [participantes, setParticipantes] = useState<IParticipante[]>();
  const getParticipante = async () => {
    try {
      const response = await api.get(`/nomes-participantes`);
      const data = response.data;
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
      Participantes até o momento
      <ul>
        {participantes &&
          participantes.map((participante) => (
            <li key={participante._id}>{participante.nome}</li>
          ))}
      </ul>
    </div>
  );
};

export default ListaParticipantes;
