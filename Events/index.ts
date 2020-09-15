import { Response } from "express";

type LogEvent = {
  time: string;
  text?: string;
  data?: object;
};

interface EventClient {
  id: number;
  res: Response;
}

let clients: EventClient[] = [];

const addClient = (client: EventClient) => clients.push(client);

const makeNewClient = (res: Response) => {
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  return newClient;
};

const getClients = () => clients;

const removeClient = (clientId: number) =>
  (clients = clients.filter((c) => c.id !== clientId));

const makeEvent = (data: string | object, text?: string): LogEvent =>
  // prettier-ignore
  typeof data === 'string'
        ? { text: data, time: Date() }
        : text
            ? { data, text, time: Date() }
            : { data, time: Date() };

const logEvents: LogEvent[] = [makeEvent("api started")];

const addLogEvent = (event: LogEvent) => logEvents.push(event);

const getLogEvents = () => logEvents;

// Iterate clients list and use write res object method to send new event
const sendLogEvent = (data: string | object, text?: string) => {
  console.log(`sendLogEvent received`, data);
  const event = makeEvent(data, text);
  console.log(`created event`, event);
  addLogEvent(event);

  const clients = getClients();
  const stringData = JSON.stringify(event);
  clients.forEach((c) => c.res.write(`data: ${stringData}\n\n`));
};

export {
  addClient,
  addLogEvent,
  getClients,
  getLogEvents,
  makeNewClient,
  makeEvent,
  removeClient,
  sendLogEvent,
};
