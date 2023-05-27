import mongoose from "mongoose";

const participantesSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  sugestaoPresente: String,
  amigoSecreto: String,
});

var Participantes = mongoose.model("Participantes", participantesSchema);

export default Participantes;
