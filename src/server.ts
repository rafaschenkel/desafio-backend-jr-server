import fastify from "fastify";
import { routes } from "./routes";

export const app = fastify();

app.register(routes);

try {
  app.listen({ port: 3333 }, () => {
    console.log("server up");
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
