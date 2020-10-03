"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http = tslib_1.__importStar(require("http"));
const CreateExpressApp_1 = tslib_1.__importDefault(require("./CreateExpressApp"));
const index_1 = require("./index");
const path_1 = tslib_1.__importDefault(require("path"));
const EventRoute_1 = require("./EventRoute");
const port = process.env.PORT || 3001;
const app = CreateExpressApp_1.default();
app.get("/", async (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/index.html"));
});
app.get("/forums", async (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/index.html"));
});
app.get(EventRoute_1.routePath, EventRoute_1.eventRoute);
const server = http.createServer();
server
    .on("request", app)
    .on("listening", function () {
    //@ts-ignore
    const addr = this.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
})
    .listen(port);
index_1.runAtInterval();
//# sourceMappingURL=server.js.map