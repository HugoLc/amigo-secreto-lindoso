import express from "express";
import {
  cadastrarPessoa,
  loginPessoa,
  getAmigoSecreto,
  sortearAmigoSecreto
} from "../controllers/controllers";
import { verificarToken } from "../middleware/auth";

const router = express.Router();

router.post("/cadastrar", cadastrarPessoa);
router.post("/login", loginPessoa);
router.get(
  "/pagina/:participante/amigo-secreto",
  verificarToken,
  getAmigoSecreto
);
router.get("/sortear", sortearAmigoSecreto)

export default router;
