import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import jwt from "jsonwebtoken";

interface loginBody {
  email: string;
  password: string;
}

export const Login = async (app: FastifyInstance) => {
  app.post("/users/login", async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = <loginBody>req.body;

    if (!email || !password)
      return reply
        .status(400)
        .send({ message: "Uma ou mais campos não foram informados!" });

    const user = await db.user.findUnique({ where: { email } });
    if (!user)
      return reply.status(404).send({ message: "Usuário não encontrado!" });

    const isSamePassword = user.password === password;
    if (!isSamePassword)
      return reply.status(401).send({ message: "Senha incorreta!" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "server-software",
      {
        expiresIn: "1d",
      }
    );

    return { token };
  });
};
