import * as http from "http";
import createExpressApp from "./CreateExpressApp";
import { runAtInterval } from "./index";
import path from "path";
import { eventRoute, routePath } from "./EventRoute";

const port = process.env.PORT || 3001;

const app = createExpressApp();

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/forums", async (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get(routePath, eventRoute);

const server = http.createServer();
server
  .on("request", app)
  .on("listening", function () {
    //@ts-ignore
    const addr = this.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  })
  .listen(port);

runAtInterval();
