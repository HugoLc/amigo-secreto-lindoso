import { Request, Response } from "express";
import Pessoa from "../model/Pessoa";
import Sorteio from "../model/Sorteio";
import CryptoJS from "crypto-js";
import Participantes from "../model/pessoa.models";

export const cadastrarPessoa = async (req: Request, res: Response) => {
  let { nome, senha, telefone, sugestaoPresente } = req.body;
  senha = CryptoJS.AES.decrypt(senha, process.env.PW_SECRET as string).toString(
    CryptoJS.enc.Utf8
  );
  try {
    const participante = new Pessoa(nome, senha, telefone, sugestaoPresente);
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
export const loginPessoa = async (req: Request, res: Response) => {
  let { nome, senha } = req.body;
  senha = CryptoJS.AES.decrypt(senha, process.env.PW_SECRET as string).toString(
    CryptoJS.enc.Utf8
  );
  try {
    const participante = new Pessoa(nome, senha);
    const loginResponse = await participante.login();
    // console.log(loginResponse);
    res
      .status(loginResponse.status)
      .json({ message: loginResponse.message, token: loginResponse.token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAmigoSecreto = async (req: Request, res: Response) => {
  const nome = req.params.participante;
  try {
    const participante = new Pessoa(nome);
    const amigoSecretoResponse = await participante.getAmigoSecreto();
    res.status(amigoSecretoResponse.status).json({
      message: amigoSecretoResponse.message,
      amigoSecreto: amigoSecretoResponse.amigoSecreto || null,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const sortearAmigoSecreto = async (req: Request, res: Response) => {
  try {
    const sorteio = new Sorteio();
    const sorteioResp = await sorteio.listarParticipantes();
    res.status(sorteioResp.status).json({ message: sorteioResp.message });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const checkToken = async (req: Request, res: Response) => {
  res.status(200).json("validated");
};
export const getNomesParticipantes = async (req: Request, res: Response) => {
  try {
    const plantasMed = await Participantes.find().select("nome");
    res.status(200).json(plantasMed);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
export const getRoles = async (req: Request, res: Response) => {
  const nome = req.params.participante;
  if (!nome) res.status(400).json({ message: "Participante não fornecido" });
  try {
    const participante = new Pessoa(nome);
    const rolesResponse = await participante.getRoles();
    res
      .status(rolesResponse.status)
      .json({ roles: JSON.parse(rolesResponse.message) });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
