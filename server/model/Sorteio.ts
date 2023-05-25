class Sorteio {
    private participantes: Pessoa[];
  
    constructor() {
    //   this.participantes = this.atualizarBd();
      this.participantes = [];
    }
  
    sortear(): Pessoa | null {
      // Lógica para sortear um participante do sorteio
      if (this.participantes.length === 0) {
        console.log('Não há participantes cadastrados.');
        return null;
      }
  
      const indiceSorteado = Math.floor(Math.random() * this.participantes.length);
      return this.participantes[indiceSorteado];
    }
  
    buscarBd(): void {
      // Lógica para buscar os participantes do sorteio em um banco de dados
      // Exemplo: this.participantes = db.buscarParticipantes();
      console.log('Buscando participantes do banco de dados...');
    }
  
    atualizarBd(): void {
      // Lógica para atualizar os participantes do sorteio em um banco de dados
      // Exemplo: db.atualizarParticipantes(this.participantes);
      console.log('Atualizando participantes no banco de dados...');
    }
  
    listarParticipantes(): void {
      // Lógica para listar os participantes do sorteio
      console.log('Participantes do sorteio:');
      this.participantes.forEach((participante, index) => {
        console.log(`${index + 1}. Nome: ${participante.nome}, Telefone: ${participante.telefone}`);
      });
    }
  }
  