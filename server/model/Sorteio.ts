import Pessoa from "./Pessoa";
import Participantes from "./pessoa.models";

export default class Sorteio {
  public participantes?: Pessoa[];

  constructor() {
    //   this.participantes = this.atualizarBd();
    this.participantes = [];
  }

  async sortear(): Promise<Pessoa[]> {
    console.log(this.participantes);
    const listaNomesParticipantes = this.participantes?.map(({ _nome }) => {
      return _nome;
    });
    console.log(listaNomesParticipantes);

    //TODO: parece que o valor estao vinculados entre todos
    const listaNaoSorteados = listaNomesParticipantes;
    console.log(listaNaoSorteados);

    const listaAmigosSecretos = listaNomesParticipantes?.map(
      (nomeParticipante) => {
        if (!listaNaoSorteados) return;

        const listaSemNomeAtual = listaNaoSorteados;
        const indexParaRemover = listaNaoSorteados.indexOf(nomeParticipante);
        if (indexParaRemover !== -1) {
          listaSemNomeAtual.splice(indexParaRemover, 1);
          const indiceSorteado = Math.floor(
            Math.random() * listaNaoSorteados.length
          );

          return new Pessoa(
            nomeParticipante,
            undefined,
            undefined,
            undefined,
            listaSemNomeAtual[indiceSorteado]
          );
        }
      }
    );
    // console.log({ listaNaoSorteados });
    // console.log({ listaAmigosSecretos });
    if (listaAmigosSecretos) return listaAmigosSecretos as Pessoa[];
    return [];
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
    // console.log(amigosSorteados);
    // this.atualizarBd(amigosSorteados);
  }
}
