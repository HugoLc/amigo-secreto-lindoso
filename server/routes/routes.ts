import express from "express";
import {
  cadastrarPessoa,
  loginPessoa,
  getAmigoSecreto,
} from "../controllers/pessoa-controllers";
import { verificarToken } from "../middleware/auth";

const router = express.Router();

router.post("/cadastrar", cadastrarPessoa);
router.post("/login", loginPessoa);
router.get(
  "/pagina/:participante/amigo-secreto",
  verificarToken,
  getAmigoSecreto
);

export default router;
