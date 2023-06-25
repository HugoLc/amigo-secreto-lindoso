import React, { useEffect, useMemo, useState } from "react";
import { IParticipante } from "../../pages/Admin/Admin";
import api from "../../service/api";

interface IProps {
  participante: IParticipante;
  token: string | undefined;
  styles: {
    [key: string]: string;
  };
}

const ParticipnteItemForm = ({ participante, token, styles }: IProps) => {
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
      await api.patch(`/atualizar/${participante.nome}`, payload, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Registro atualizado");
      // window.location.reload();
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
    console.log("Entrou");
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
    <li className={styles["item-participante"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["text-wrapper"]}>
          <div className={styles["text-line"]}></div>
          <label>Nome: </label>
          <span>{participante.nome} </span>
          <div className={styles["text-line"]}>
            <label>Tel: </label>
            <span>{participante.telefone} </span>
          </div>
        </div>
        <div className={styles["checkbox-wrapper"]}>
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
        </div>
        <button type="submit" disabled={disableSubmit}>
          Salvar
        </button>
      </form>
    </li>
  );
};

export default ParticipnteItemForm;
