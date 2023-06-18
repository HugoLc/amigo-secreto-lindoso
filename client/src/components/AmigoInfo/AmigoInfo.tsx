import React from "react";
import Logout from "../Header/Logout";
import { IAmigoSecreto } from "../../pages/ParticipantePage/ParticipantePage";

interface IProps {
  amigoInfo?: IAmigoSecreto;
  styles: {
    [key: string]: string;
  };
  userId: string;
  isSugestao?: boolean;
  setIsSugestao: React.Dispatch<React.SetStateAction<boolean>>;
}

const AmigoInfo = ({ amigoInfo, styles, userId, setIsSugestao }: IProps) => {
  if (amigoInfo) {
    return (
      <>
        <h1 className={styles["title-participante"]}>Olá, {userId}! </h1>
        <div className={styles["text-container"]}>
          <p className={styles["text-participante"]}>
            O sorteio já rolou seu presente será para:
          </p>
          <p className={styles["text-participante__highlight"]}>
            {amigoInfo.nome}!
          </p>
          {amigoInfo.sugestaoPresente ? (
            <>
              <p className={styles["text-participante"]}>E o pedido foi:</p>
              <p className={styles["text-participante__highlight"]}>
                {amigoInfo.nome}!
              </p>
              <p className={styles["text-participante"]}>
                A troca de presentes será dia:
              </p>
              <p className={styles["text-participante__highlight"]}>25/12</p>
              <p className={styles["text-participante"]}>E o local será:</p>
              <p className={styles["text-participante__highlight"]}>
                Casa da Tia Maria
              </p>
            </>
          ) : (
            <p
              className={styles["text-participante"]}
            >{`Seu amigo secreto não deixou uma sugestão de presente. :(`}</p>
          )}
          <div className={styles["btn-wrapper"]}>
            <Logout className="btn-sair" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className={styles["title-participante"]}>Olá, {userId}!</h1>
      <div className={styles["text-container"]}>
        <p className={styles["text-participante"]}>
          O sorteio ainda não aconteceu, volte em breve!
        </p>
        <div className={`${styles["btn-wrapper"]} ${styles["space"]}`}>
          <button className="btn-link" onClick={() => setIsSugestao(true)}>
            Quer mudar o presente?
          </button>
          <Logout className="btn-sair" />
        </div>
      </div>
    </>
  );
};

export default AmigoInfo;
