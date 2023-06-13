import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

export function verificarToken(req: Request, res: Response, next: any) {
  const token = req.headers.authorization;

  if (!token) {
    // Se não houver token, retornar erro de autenticação
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido" });
  }

  try {
    // Verificar a validade do token
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as {
      userId: string;
    };

    if (
      req.params.participante &&
      decodedToken.userId !== req.params.participante
    ) {
      throw new URIError(
        "Acesso nao autorizado a pagina de: " + req.params.participante
      );
    } else {
      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: "Token de autenticação expirado" });
    } else if (error instanceof URIError) {
      res.status(401).json({ message: error.message });
    } else {
      // Token inválido ou erro de decodificação, retornar erro de autenticação
      res.status(401).json({ message: "Token de autenticação inválido" });
    }
  }
}
