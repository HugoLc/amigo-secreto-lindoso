class Pessoa {
  private _nome: string;
  private _telefone: string;
  private _sugestaoPresente: string;
  private _amigoSecreto: string;

  constructor(
    nome: string,
    telefone: string,
    sugestaoPresente: string,
    amigoSecreto: string
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
    return this._amigoSecreto;
  }

  cadastrar(): void {
    // Lógica para cadastrar a pessoa aqui
    // Por exemplo, você pode salvar os dados em um banco de dados
    console.log("Pessoa cadastrada com sucesso!");
  }
}
