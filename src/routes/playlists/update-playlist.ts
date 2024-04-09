import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

interface updatePlaylistParams {
  user_id: string;
  id: string;
}

interface updatePlaylistBody {
  name?: string;
  genre?: string;
  musics?: string[];
}

export const UpdatePlaylist = async (app: FastifyInstance) => {
  app.put(
    "/playlists/:id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const user = await Auth(req, reply);

      const { id } = <updatePlaylistParams>req.params;

      if (Number.isNaN(Number(id)))
        return reply.status(400).send({ message: "Id inválido!" });
      const idNum = Number(id);

      const playlist = await db.playlist.findUnique({
        where: { id: idNum, user_id: user.id },
      });

      if (!playlist)
        return reply.status(404).send({ message: "Playlist não encontrada!" });

      const { name, genre, musics } = <updatePlaylistBody>req.body;

      const data = { name, genre, musics };

      const playlistUpdate = await db.playlist
        .update({
          where: { user_id: user.id, id: idNum },
          data,
        })
        .then((playlist) => playlist);

      return reply
        .status(201)
        .send({ playlistUpdate, message: "Playlist atualizada com sucesso!" });
    }
  );
};
