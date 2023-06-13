import React, { useEffect, useMemo, useState } from "react";
import { IParticipante } from "../../pages/Admin/Admin";
import api from "../../service/api";

interface IProps {
  participante: IParticipante;
}

const ParticipnteItemForm = ({ participante }: IProps) => {
  const [adminState, setAdminState] = useState<boolean>(
    participante.roles.includes(0) || participante.roles.includes(1)
  );
  const initialAdminState = useMemo(
    () => participante.roles.includes(0) || participante.roles.includes(1),
    []
  );

  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      roles: adminState ? [1, 2] : [2],
    };

    try {
      console.log("estrei");
      const resp = await api.patch(`/atualizar/${participante.nome}`, payload);
      const data = resp.data;
      console.log("update", data);
      // window.location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminState(event.target.checked);
  };

  useEffect(() => {
    if (adminState !== initialAdminState) setDisableSubmit(false);
    else setDisableSubmit(true);
  }, [adminState]);

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <span>{participante.nome} | </span>
        <span>{participante.telefone} | </span>
        <span>{JSON.stringify(participante.roles)} </span>
        <label>
          <input
            type="checkbox"
            checked={adminState}
            onChange={handleCheckboxChange}
          />
          Admin
        </label>
        <button type="submit" disabled={disableSubmit}>
          Salvar
        </button>
      </form>
    </li>
  );
};

export default ParticipnteItemForm;
