"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoute = exports.routePath = void 0;
const Events_1 = require("../Events");
exports.routePath = "/logEvent/";
// Middleware for GET /events endpoint
const eventsHandler = async (req, res, next) => {
    // Mandatory headers and http status to keep connection open
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    //OK!
    res.writeHead(200, headers);
    const startingEvents = Events_1.makeEvent({
        body: "Subscribing to CSPAM Times Real Time Ticker...",
    });
    const stringData = JSON.stringify(startingEvents);
    // After client opens connection send log events, bot settings
    const data = `data: ${stringData}\n\n`;
    res.write(data);
    // Generate an id based on timestamp and save res
    // object of client connection on clients list
    // Later we'll iterate it and send updates to each client
    const newClient = Events_1.makeNewClient(res);
    //add the new client to the array of clients
    Events_1.addClient(newClient);
    // When client closes connection we update the clients list
    // avoiding the disconnected one
    req.on("close", () => {
        console.log(`${newClient.id} Connection closed`);
        Events_1.removeClient(newClient.id);
    });
};
exports.eventRoute = async (req, res, next) => {
    try {
        eventsHandler(req, res, next);
    }
    catch (error) {
        res.status(500);
        next(error);
    }
};
//# sourceMappingURL=index.js.map