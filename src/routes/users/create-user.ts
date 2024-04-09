import { FastifyReply } from "fastify";
import { FastifyInstance, FastifyRequest } from "fastify";
import { db } from "../../db";
import { stringify } from "querystring";

interface createUserBody {
  name: string;
  email: string;
  password: string;
}

export const CreateUser = async (app: FastifyInstance) => {
  app.post("/users", async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.body)
      return reply
        .status(400)
        .send({ message: "Não foi enviado um body válido!" });
    const { name, email, password } = <createUserBody>req.body;

    if (!name || !email || !password)
      return reply
        .status(400)
        .send({ message: "Uma ou mais campos não foram informados!" });

    const user = await db.user.findUnique({ where: { email } });

    if (user)
      return reply
        .status(409)
        .send({ message: "Já existe um usuário cadastrado com esse email!" });

    const data = { name, email, password };

    await db.user.create({ data });

    return reply.status(201).send({ message: "Usuário criado com sucesso!" });
  });
};
