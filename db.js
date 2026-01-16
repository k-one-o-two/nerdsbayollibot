import { MongoClient } from "mongodb";
import { settings } from "./settings.js";

const client = new MongoClient(settings.uri);

let database;

export const init = async () => {
  database = client.db("olli");
  await client.connect();
  return database;
};

export const getCollections = async () => {
  return {
    get id_pairs() {
      return database.collection("id_pairs");
    },
    get counters() {
      return database.collection("counters");
    },
  };
};
