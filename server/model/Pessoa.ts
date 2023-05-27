import Participantes from "./pessoa.models";

export default class Pessoa {
  private _nome: string;
  private _telefone: string;
  private _sugestaoPresente: string;
  private _amigoSecreto?: string;

  constructor(
    nome: string,
    telefone: string,
    sugestaoPresente: string,
    amigoSecreto?: string
  ) {
    this._nome = nome;
    this._telefone = telefone;
    this._sugestaoPresente = sugestaoPresente;
    this._amigoSecreto = amigoSecreto;
  }

  get nome(): string {
    return this._nome;
  }

  get telefone(): string {
    return this._telefone;
  }

  get sugestaoPresente(): string {
    return this._sugestaoPresente;
  }

  get amigoSecreto(): string {
    return this._amigoSecreto || "";
  }

  async cadastrar(): Promise<{ status: number; message: string }> {
    // Lógica para cadastrar a pessoa aqui
    // Por exemplo, você pode salvar os dados em um banco de dados
    const newParticipante = new Participantes({
      nome: this._nome,
      telefone: this._telefone,
      sugestaoPresente: this._sugestaoPresente,
    });

    try {
      await newParticipante.save();
      return { status: 200, message: "Pessoa cadastrada com sucesso!" };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }
}
