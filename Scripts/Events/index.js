"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLogEvent = exports.removeClient = exports.makeEvent = exports.makeNewClient = exports.getLogEvents = exports.getClients = exports.addLogEvent = exports.addClient = void 0;
let clients = [];
const addClient = (client) => clients.push(client);
exports.addClient = addClient;
const makeNewClient = (res) => {
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res,
    };
    return newClient;
};
exports.makeNewClient = makeNewClient;
const getClients = () => clients;
exports.getClients = getClients;
const removeClient = (clientId) => (clients = clients.filter((c) => c.id !== clientId));
exports.removeClient = removeClient;
const makeEvent = (data, text) => 
// prettier-ignore
typeof data === 'string'
    ? { text: data, time: Date() }
    : text
        ? { data, text, time: Date() }
        : { data, time: Date() };
exports.makeEvent = makeEvent;
const logEvents = [makeEvent("api started")];
const addLogEvent = (event) => logEvents.push(event);
exports.addLogEvent = addLogEvent;
const getLogEvents = () => logEvents;
exports.getLogEvents = getLogEvents;
// Iterate clients list and use write res object method to send new event
const sendLogEvent = (data, text) => {
    console.log(`sendLogEvent received`, data);
    const event = makeEvent(data, text);
    console.log(`created event`, event);
    addLogEvent(event);
    const clients = getClients();
    const stringData = JSON.stringify(event);
    clients.forEach((c) => c.res.write(`data: ${stringData}\n\n`));
};
exports.sendLogEvent = sendLogEvent;
//# sourceMappingURL=index.js.map