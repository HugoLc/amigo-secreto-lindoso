import Pessoa from "./Pessoa";
import Participantes from "./pessoa.models";

export default class Sorteio {
  public participantes?: Pessoa[];

  constructor() {
    //   this.participantes = this.atualizarBd();
    this.participantes = [];
  }

  async sortear(): Promise<Pessoa[]> {
    // console.log(this.participantes);
    const listaNomesParticipantes = this.participantes?.map(({ _nome }) => {
      return _nome;
    });

    if (!listaNomesParticipantes) return [];
    var participantesDisponiveis = listaNomesParticipantes.slice();
    var resultadoSorteio = [];

    // Itera por cada participante
    for (var i = 0; i < listaNomesParticipantes.length; i++) {
      var participante = listaNomesParticipantes[i];
      var indexSorteado = Math.floor(
        Math.random() * participantesDisponiveis.length
      );
      var sorteado = participantesDisponiveis[indexSorteado];

      // Verifica se o participante sorteado é o próprio participante
      if (sorteado === participante) {
        // Se for, sorteia novamente até obter um sorteado diferente
        while (sorteado === participante) {
          indexSorteado = Math.floor(
            Math.random() * participantesDisponiveis.length
          );
          sorteado = participantesDisponiveis[indexSorteado];
        }
      }

      // Remove o sorteado da lista de participantes disponíveis
      participantesDisponiveis.splice(indexSorteado, 1);

      // Cria um objeto com o participante e o seu sorteado
      var resultado = new Pessoa(
        participante,
        undefined,
        undefined,
        undefined,
        sorteado
      );

      // Adiciona o resultado ao array de resultados
      resultadoSorteio.push(resultado);
    }

    // Retorna o array de resultados
    return resultadoSorteio;
  }

  async buscarBd(): Promise<void> {
    try {
      const participantesDB = await Participantes.find();
      const listaParticipantes = participantesDB.map((participante) => {
        return new Pessoa(
          participante.nome,
          undefined,
          undefined,
          undefined,
          participante.amigoSecreto
        );
      });
      this.participantes = listaParticipantes;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async atualizarBd(amigosSorteados: Pessoa[]): Promise<void> {
    for (const pessoa of amigosSorteados) {
      pessoa.setAmigoSecreto();
    }
  }

  async listarParticipantes(): Promise<void> {
    await this.buscarBd();
    const amigosSorteados = await this.sortear();
    console.log(amigosSorteados);
    // this.atualizarBd(amigosSorteados);
  }
}
