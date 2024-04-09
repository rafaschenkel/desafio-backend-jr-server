import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db";
import { Auth } from "../../controllers/auth";

interface createPlaylistBody {
  name: string;
  genre: string;
  musics: string[];
}

export const CreatePlaylist = async (app: FastifyInstance) => {
  app.post("/playlists", async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await Auth(req, reply);

    const { name, genre, musics } = <createPlaylistBody>req.body;
    if (!name || !genre || musics.length === 0)
      return reply
        .status(400)
        .send({ message: "Uma ou mais campos não foram informados!" });

    const data = { user_id: user.id, name, genre, musics };
    const playlist = await db.playlist
      .create({
        data,
      })
      .then((playlist) => playlist);

    return reply
      .status(201)
      .send({ playlist, message: "Playlist criada com sucesso!" });
  });
};
