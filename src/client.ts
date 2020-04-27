import * as Colyseus from "colyseus.js";

const client = new Colyseus.Client(process.env.VUE_APP_URL);

export default client;
