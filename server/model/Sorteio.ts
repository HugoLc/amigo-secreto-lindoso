import Pessoa from "./Pessoa";
import Participantes from "./pessoa.models";

export default class Sorteio {
  public participantes?: Pessoa[];

  constructor() {
    this.participantes = [];
  }

  async sortear(): Promise<Pessoa[]> {
    const listaNomesParticipantes = this.participantes?.map(({ _nome }) => {
      return _nome;
    });

    if (!listaNomesParticipantes) return [];
    var resultadoSorteio: Pessoa[] = [];
    let participante = listaNomesParticipantes[0];
    let primeiroParticipante = listaNomesParticipantes[0];
    var participantesDisponiveis = listaNomesParticipantes.slice(1);

    async function handleSorteio(
      participante: string,
      participantesDisponiveis: string[]
    ) {
      if (participantesDisponiveis.length === 1) {
        let resultadoPenultimo = new Pessoa(
          participante,
          undefined,
          undefined,
          undefined,
          participantesDisponiveis[0]
        );
        let resultadoUltimo = new Pessoa(
          participantesDisponiveis[0],
          undefined,
          undefined,
          undefined,
          primeiroParticipante
        );
        resultadoSorteio.push(resultadoPenultimo);
        resultadoSorteio.push(resultadoUltimo);
        return;
      }

      let indexSorteado = Math.floor(
        Math.random() * participantesDisponiveis.length
      );
      let sorteado = participantesDisponiveis[indexSorteado];

      participantesDisponiveis.splice(indexSorteado, 1);

      var resultado = new Pessoa(
        participante,
        undefined,
        undefined,
        undefined,
        sorteado
      );

      resultadoSorteio.push(resultado);
      participante = sorteado;

      await handleSorteio(participante, participantesDisponiveis);
    }
    await handleSorteio(participante, participantesDisponiveis);
    return resultadoSorteio;
  }

  async buscarBd(): Promise<void> {
    try {
      const participantesDB = await Participantes.find({ confirmado: true });
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

  async listarParticipantes(): Promise<{ status: number; message: string }> {
    try {
      await this.buscarBd();
      const amigosSorteados = await this.sortear();
      await this.atualizarBd(amigosSorteados);
      return { status: 200, message: "Sorteio realizado com sucesso" };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }
}
