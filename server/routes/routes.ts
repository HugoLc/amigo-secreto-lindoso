import express, { Request, Response } from "express";
import {
  cadastrarPessoa,
  loginPessoa,
  getAmigoSecreto,
  sortearAmigoSecreto,
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
router.get("/checktoken", verificarToken);
router.get(
  "/pagina/:participante/amigo-secreto",
  verificarToken,
  getAmigoSecreto
);
router.patch(
  "/atualizar/:participante",
  (req, res, next) => verificarToken(req, res, next, "selfOrAdmin"),
  atualizarParticipante
);
router.get("/sortear/:participante", verificarToken, sortearAmigoSecreto); //TODO fazer a mesma regra do dashboard
router.get("/nomes-participantes", getNomesParticipantes);
router.get("/roles/:participante", (req, res, next) =>
  getRoles(req, res, next)
);
router.get("/participante/:participante", getUser);
router.get("/dashboard/:participante", verificarToken, getDashboard);

export default router;
