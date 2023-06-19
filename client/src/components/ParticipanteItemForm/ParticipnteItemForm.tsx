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
  const [confirmadoState, setConfirmadoState] = useState<boolean>(
    participante.confirmado
  );
  const initialAdminState = useMemo(
    () => participante.roles.includes(0) || participante.roles.includes(1),
    []
  );
  const initialConfirmadoState = useMemo(() => participante.confirmado, []);

  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      roles: adminState ? [1, 2] : [2],
      confirmado: confirmadoState,
    };

    try {
      await api.patch(`/atualizar/${participante.nome}`, payload);
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAdminCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminState(event.target.checked);
  };
  const handleConfirmadoCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmadoState(event.target.checked);
  };

  useEffect(() => {
    if (
      adminState !== initialAdminState ||
      confirmadoState !== initialConfirmadoState
    )
      setDisableSubmit(false);
    else setDisableSubmit(true);
  }, [adminState, confirmadoState]);

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
            onChange={handleAdminCheckboxChange}
          />
          Admin
        </label>
        <label>
          <input
            type="checkbox"
            checked={confirmadoState}
            onChange={handleConfirmadoCheckboxChange}
          />
          Comprovado
        </label>
        <button type="submit" disabled={disableSubmit}>
          Salvar
        </button>
      </form>
    </li>
  );
};

export default ParticipnteItemForm;
