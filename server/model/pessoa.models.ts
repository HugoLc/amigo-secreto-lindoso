import mongoose from "mongoose";
import bcrypt from "bcrypt";

const participantesSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefone: { type: String, required: true },
  sugestaoPresente: String,
  amigoSecreto: String,
  roles: [Number],
  confirmado: Boolean,
});

participantesSchema.pre("save", function (next) {
  const usuario = this;

  // Verifica se a senha foi modificada ou se é um novo usuário
  if (!usuario.isModified("senha")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(usuario.senha, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      usuario.senha = hash;
      next();
    });
  });
});

var Participantes = mongoose.model("Participantes", participantesSchema);

export default Participantes;
