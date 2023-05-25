import express from "express";
import { cadastrarPessoa } from "../controllers/pessoa-controllers";

const router = express.Router();

router.get("/cadastrar", cadastrarPessoa);

export default router;
