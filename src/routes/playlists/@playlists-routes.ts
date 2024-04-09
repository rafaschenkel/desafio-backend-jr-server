import { FastifyInstance } from "fastify";
import { CreatePlaylist } from "./create-playlist";
import { GetAllPlaylists } from "./getall-playlists";
import { DeletePlaylist } from "./delete-playlist";
import { UpdatePlaylist } from "./update-playlist";

export const PlaylistRoutes = async (app: FastifyInstance) => {
  app.register(CreatePlaylist);
  app.register(DeletePlaylist);
  app.register(GetAllPlaylists);
  app.register(UpdatePlaylist);
};
