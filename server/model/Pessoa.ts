import Participantes from "./pessoa.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IResponse {
  status: number;
  message: string;
  token?: string;
  amigoSecreto?: IAmigoSecreto;
}

interface IAmigoSecreto {
  nome: string;
  telefone?: string;
  sugestaoPresente?: string;
}
export default class Pessoa {
  public _nome: string;
  public _senha: string;
  public _telefone?: string;
  public _sugestaoPresente?: string;
  public _amigoSecreto?: string;

  constructor(
    nome: string,
    senha?: string,
    telefone?: string,
    sugestaoPresente?: string,
    amigoSecreto?: string
  ) {
    this._nome = nome;
    this._senha = senha || "";
    this._telefone = telefone;
    this._sugestaoPresente = sugestaoPresente;
    this._amigoSecreto = amigoSecreto;
  }

  async cadastrar(): Promise<IResponse> {
    const newParticipante = new Participantes({
      nome: this._nome,
      senha: this._senha,
      telefone: this._telefone,
      sugestaoPresente: this._sugestaoPresente,
      amigoSecreto: this._amigoSecreto,
    });

    try {
      await newParticipante.save();
      return { status: 200, message: "Pessoa cadastrada com sucesso!" };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  async login(): Promise<IResponse> {
    const usuario = await Participantes.findOne({ nome: this._nome });
    // console.log(usuario);
    if (!usuario) {
      return { status: 404, message: "Usuário não encontrado" };
    }

    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const senhaCorreta = await bcrypt.compare(this._senha, usuario.senha);

    if (!senhaCorreta) {
      return { status: 401, message: "Credenciais inválidas" };
    }
    const token = jwt.sign(
      { userId: usuario.nome },
      process.env.SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return { status: 200, message: "Login realizado com sucesso", token };
  }

  async setAmigoSecreto(): Promise<void> {
    // TODO: ativar em prod
    // const criptAmigoSecreto = CryptoJS.AES.encrypt(
    //   this._amigoSecreto as string,
    //   process.env.PW_SECRET as string
    // ).toString();

    Participantes.findOneAndUpdate(
      { nome: this._nome },
      { amigoSecreto: this._amigoSecreto },
      { new: true }
    )
      .then((updatedDoc) => {
        // O documento atualizado é retornado
        console.log(updatedDoc);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getAmigoSecreto(): Promise<IResponse> {
    const usuario = await Participantes.findOne({ nome: this._nome });
    // console.log(usuario);

    if (!usuario) {
      return { status: 404, message: "Usuário não encontrado" };
    } else if (!usuario.amigoSecreto) {
      return { status: 404, message: "Amigo secreto não registrado" };
    }

    // TODO: ativar em prod
    // const descriptAmigoSecreto = CryptoJS.AES.decrypt(
    //   usuario.amigoSecreto,
    //   process.env.PW_SECRET as string
    // ).toString(CryptoJS.enc.Utf8);

    const amigoSecretoInfo = await Participantes.findOne({
      nome: usuario.amigoSecreto, //descriptAmigoSecreto
    }).select("nome telefone sugestaoPresente");
    if (!amigoSecretoInfo) {
      return { status: 404, message: "Amigo secreto não encontrado" };
    }
    return {
      status: 200,
      message: "Amigo secreto encontrado",
      amigoSecreto: amigoSecretoInfo,
    };
  }
}
