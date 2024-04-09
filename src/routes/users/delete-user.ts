import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

interface deleteUserParams {
  user_id: string;
}

export const DeleteUser = async (app: FastifyInstance) => {
  app.delete(
    "/users/:user_id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const userLogged = await Auth(req, reply);

      if (userLogged.role !== "ADMIN")
        return reply.status(403).send({ message: "Não autorizado!" });

      const { user_id } = <deleteUserParams>req.params;
      if (Number.isNaN(Number(user_id)))
        return reply.status(400).send({ message: "Id inválido!" });
      const id = Number(user_id);

      const user = await db.user.findUnique({ where: { id } });

      if (!user)
        return reply.status(404).send({ message: "Usuário não encontrado!" });

      await db.user.delete({ where: { id } });
      return reply
        .status(200)
        .send({ message: "Usuário removido com sucesso!" });
    }
  );
};
