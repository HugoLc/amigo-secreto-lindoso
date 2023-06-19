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
export const atualizarParticipante = async (req: Request, res: Response) => {
  const nome = req.params.participante;
  const { telefone, sugestaoPresente, roles, confirmado } = req.body;

  try {
    const participante = new Pessoa(
      nome,
      undefined,
      telefone,
      sugestaoPresente,
      undefined,
      roles,
      confirmado
    );
    const atualizarResponse = await participante.atualizar();
    res.status(atualizarResponse.status).json({
      message: atualizarResponse.message,
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

export const getNomesParticipantes = async (req: Request, res: Response) => {
  try {
    const nomesParticipantes = await Participantes.find().select("nome");
    res.status(200).json(nomesParticipantes);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
export const getRoles = async (
  req: Request,
  res: Response,
  participante: string | undefined = undefined
) => {
  let nome: string;
  if (participante) {
    nome = participante;
    try {
      const participante = new Pessoa(nome);
      const rolesResponse = await participante.getRoles();
      return JSON.parse(rolesResponse.message);
    } catch (error: any) {
      return undefined;
    }
  } else {
    nome = req.params.participante;
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
  }
};
export const getUser = async (req: Request, res: Response) => {
  const nome = req.params.participante;
  if (!nome) res.status(400).json({ message: "Participante não fornecido" });
  try {
    const participante = new Pessoa(nome);
    const userResponse = await participante.getUser();
    res.status(userResponse.status).json(userResponse.amigoSecreto);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
export const getDashboard = async (req: Request, res: Response) => {
  const nome = req.params.participante;
  try {
    const participante = new Pessoa(nome);
    const rolesResponse = await participante.getRoles();
    const roles = JSON.parse(rolesResponse.message);
    const isAdmin = roles.includes(0) || roles.includes(1);

    if (!isAdmin) {
      res.status(rolesResponse.status).json({
        isAdmin: isAdmin,
      });
    } else {
      const listaParticipantes = await Participantes.find({
        roles: { $ne: 0 },
      }).select("nome telefone roles confirmado");

      res.status(rolesResponse.status).json({
        isAdmin: isAdmin,
        listaParticipantes,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
