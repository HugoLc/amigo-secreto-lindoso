import React, { useEffect, useMemo, useState } from "react";
import { IParticipante } from "../../pages/Admin/Admin";

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted!", adminState);
    // TODO: roda de atualizar cadastro de participantes recebendo o nome do participante e atualizando o registro de roles
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
