import express, { Request, Response } from "express";
import {
  cadastrarPessoa,
  loginPessoa,
  getAmigoSecreto,
  sortearAmigoSecreto,
  checkToken,
  getNomesParticipantes,
  getRoles,
  getDashboard,
  atualizarParticipante,
  getUser,
} from "../controllers/controllers";
import { verificarToken } from "../middleware/auth";

const router = express.Router();

router.post("/cadastrar", cadastrarPessoa);
router.post("/login", loginPessoa);
router.get("/checktoken", verificarToken, checkToken);
router.get(
  "/pagina/:participante/amigo-secreto",
  /* self */
  verificarToken,
  getAmigoSecreto
);
//TODO: atualizar verificando o token
router.patch("/atualizar/:participante", /* REVISAR */ atualizarParticipante);
router.get("/sortear", /* selfAndAdmin */ sortearAmigoSecreto);
router.get("/nomes-participantes", getNomesParticipantes);
router.get("/roles/:participante", getRoles);
router.get("/participante/:participante", getUser);
router.get(
  "/dashboard/:admin",
  /* selfAndAdmin */ verificarToken,
  getDashboard
);

export default router;
