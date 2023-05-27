import { Request, Response } from "express";
import Pessoa from "../model/Pessoa";
export const cadastrarPessoa = async (req: Request, res: Response) => {
  const { nome, telefone, sugestaoPresente } = req.body;
  try {
    const participante = new Pessoa(nome, telefone, sugestaoPresente);
    const cadastroResponse = await participante.cadastrar();

    res
      .status(cadastroResponse.status)
      .json(
        cadastroResponse.status != 200
          ? { message: cadastroResponse.message }
          : { message: cadastroResponse.message, participante }
      );
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
