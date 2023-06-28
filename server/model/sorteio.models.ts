import mongoose from "mongoose";

const sorteioSchema = new mongoose.Schema({
  participantes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Participantes" },
  ],
  dataSorteio: Date,
  dataTrocaPresente: Date,
  estadoSorteio: Boolean,
  localTrocaPresente: String,
});

var SorteioModel = mongoose.model("Sorteio", sorteioSchema);

export default SorteioModel;
