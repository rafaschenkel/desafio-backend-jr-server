import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

export const GetAllUsers = async (app: FastifyInstance) => {
  app.get("/users", async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await Auth(req, reply);

    if (user.role !== "ADMIN")
      return reply.status(403).send({ message: "Não autorizado!" });

    const users = await db.user.findMany();

    return reply.send(users);
  });
};
