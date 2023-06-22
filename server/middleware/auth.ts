import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getRoles } from "../controllers/controllers";
// import dotenv from "dotenv";

// dotenv.config();

export async function verificarToken(
  req: Request,
  res: Response,
  next: any,
  context = "self"
) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido" });
  }

  try {
    // Verificar a validade do token
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as {
      userId: string;
    };

    const roles = await getRoles(req, res, decodedToken?.userId);

    switch (context) {
      case "selfAndAdmin":
        if (
          req.params.participante &&
          decodedToken.userId == req.params.participante &&
          (roles.includes(0) || roles.includes(1))
        ) {
          next();
        } else {
          throw new URIError(
            "Acesso nao autorizado a pagina de: " + req.params.participante
          );
        }
        break;
      case "selfOrAdmin":
        if (
          req.params.participante &&
          (decodedToken.userId === req.params.participante ||
            roles.includes(0) ||
            roles.includes(1))
        ) {
          next();
        } else {
          throw new URIError(
            "Acesso nao autorizado a pagina de: " + req.params.participante
          );
        }
        break;
      case "self":
        if (!req.params.participante) {
          if (req.originalUrl === "/api/checktoken") {
            res.status(200).json("validated");
          }
          next();
        } else if (
          req.params.participante &&
          decodedToken.userId === req.params.participante
        ) {
          next();
        } else {
          throw new URIError(
            "Acesso nao autorizado a pagina de: " + req.params.participante
          );
        }
        break;
      default:
        next();
        break;
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: "Token de autenticação expirado" });
    } else if (error instanceof URIError) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "Token de autenticação inválido" });
    }
  }
}
