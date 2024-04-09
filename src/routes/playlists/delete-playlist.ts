import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

interface deletePlaylistParams {
  id: string;
}

export const DeletePlaylist = async (app: FastifyInstance) => {
  app.delete(
    "/playlists/:id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const user = await Auth(req, reply);

      const { id } = <deletePlaylistParams>req.params;

      if (Number.isNaN(Number(id)))
        return reply.status(400).send({ message: "Id inválido!" });
      const idNum = Number(id);

      const playlist = await db.playlist.findUnique({
        where: { id: idNum, user_id: user.id },
      });

      if (!playlist)
        return reply.status(404).send({ message: "Playlist não encontrada!" });

      await db.playlist.delete({ where: { id: idNum } });

      return reply
        .status(200)
        .send({ message: "Playlist excluida com sucesso!" });
    }
  );
};
