import mongoose from "mongoose";

const participantesSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  sugestaoPresente: String,
  amigoSecreto: String,
});

var Participantes = mongoose.model("Participantes", participantesSchema);

export default Participantes;
