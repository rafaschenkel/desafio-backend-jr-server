import { FastifyReply } from "fastify";
import { FastifyInstance, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

interface updateUserParams {
  user_id: string;
}

interface updateUserBody {
  name?: string;
  email?: string;
  password?: string;
}

export const UpdateUser = async (app: FastifyInstance) => {
  app.put(
    "/users/:user_id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const userLogged = await Auth(req, reply);

      if (userLogged.role !== "ADMIN")
        return reply.status(403).send({ message: "Não autorizado!" });

      const { user_id } = <updateUserParams>req.params;

      if (Number.isNaN(Number(user_id)))
        return reply.status(400).send({ message: "Id inválido!" });
      const id = Number(user_id);

      const user = await db.user.findUnique({ where: { id } });
      if (!user)
        return reply.status(409).send({ message: "Usuário não encontrado!" });

      let { name, email, password } = <updateUserBody>req.body;

      const data = { name, email, password };

      await db.user.update({
        where: { id },
        data,
      });

      return reply
        .status(200)
        .send({ message: "Usuário atualizado com sucesso!" });
    }
  );
};
