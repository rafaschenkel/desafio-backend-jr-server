import { FastifyInstance } from "fastify";
import { UserRoutes } from "./routes/users/@user-routes";
import { PlaylistRoutes } from "./routes/playlists/@playlists-routes";

export const routes = async (app: FastifyInstance) => {
  app.register(UserRoutes);
  app.register(PlaylistRoutes);
};
