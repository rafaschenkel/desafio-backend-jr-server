import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { db } from "../db";

export const Auth = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.headers.authorization?.replace(/^Bearer /, "");

  if (!token)
    return reply.status(401).send({ message: "Usuário não está logado!" });

  const decodedToken = jwt.verify(token, "server-software");
  if (typeof decodedToken === "string")
    return reply
      .status(401)
      .send({ message: "Seu token expirou, faça login novamente!" });
  const user = await db.user.findUnique({
    where: {
      email: decodedToken.email,
    },
  });

  if (!user)
    return reply.status(404).send({ message: "Usuário não encontrado!" });

  return user;
};
