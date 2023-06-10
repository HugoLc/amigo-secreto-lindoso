import express from "express";
import {
  cadastrarPessoa,
  loginPessoa,
  getAmigoSecreto,
  sortearAmigoSecreto,
  checkToken,
  getNomesParticipantes,
  getRoles,
  getDashboard,
} from "../controllers/controllers";
import { verificarToken } from "../middleware/auth";

const router = express.Router();

router.post("/cadastrar", cadastrarPessoa);
router.post("/login", loginPessoa);
router.get("/checktoken", verificarToken, checkToken);
router.get(
  "/pagina/:participante/amigo-secreto",
  verificarToken,
  getAmigoSecreto
);
router.get("/sortear", sortearAmigoSecreto);
router.get("/nomes-participantes", getNomesParticipantes);
router.get("/roles/:participante", getRoles);
router.get("/dashboard/:admin", verificarToken, getDashboard);

export default router;
