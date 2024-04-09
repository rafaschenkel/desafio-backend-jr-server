import { FastifyInstance } from "fastify";
import { CreateUser } from "./create-user";
import { GetAllUsers } from "./getall-user";
import { DeleteUser } from "./delete-user";
import { UpdateUser } from "./update-user";
import { Login } from "./login";

export const UserRoutes = async (app: FastifyInstance) => {
  app.register(CreateUser);
  app.register(DeleteUser);
  app.register(GetAllUsers);
  app.register(UpdateUser);
  app.register(Login);
};
