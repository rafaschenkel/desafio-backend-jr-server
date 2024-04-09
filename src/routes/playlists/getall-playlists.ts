import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

export const GetAllPlaylists = async (app: FastifyInstance) => {
  app.get("/playlists", async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await Auth(req, reply);

    const playlists = await db.playlist.findMany({
      where: { user_id: user.id },
    });
    return reply.status(200).send(playlists);
  });
};
