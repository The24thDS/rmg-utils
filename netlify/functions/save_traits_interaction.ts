import { Handler, HandlerResponse } from "@netlify/functions";
import { MongoClient } from "mongodb";
import invariant from "tiny-invariant";
import { State } from "../../src/components/TraitsBuilderTab/index.d";

invariant(process.env.MONGODB_URI, "MongoDB URI is not defined.");
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

const saveLocatorsInteraction = async (type: "PNG" | "DDS", state: State) => {
  const { MONGODB_DATABASE, MONGODB_TRAITS_COLLECTION } =
    process.env;
  const {
    name,
    bgColor,
    recolorIcon,
    iconColor,
    iconScale,
    iconXOffset,
    iconYOffset,
  } = state;

  invariant(MONGODB_DATABASE, "Mongo DB name is not defined.");
  invariant(MONGODB_TRAITS_COLLECTION, "Mongo DB collection is not defined.");

  const database = (await clientPromise).db(MONGODB_DATABASE);
  const collection = database.collection(MONGODB_TRAITS_COLLECTION);

  await collection.insertOne({
    name,
    format: type,
    bg_color: bgColor,
    recolor_icon: recolorIcon,
    icon_color: iconColor,
    icon_scale: iconScale,
    icon_x_offset: iconXOffset,
    icon_y_offset: iconYOffset,
    created_at: new Date(),
  });

};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const handler: Handler = async (event, _context) => {
  const response: HandlerResponse = {
    statusCode: 200,
    headers,
  };

  switch (event.httpMethod) {
    case "POST":
      if (!event.body) {
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "A JSON body is required." });
      } else {
        const { type, state } = JSON.parse(event.body);
        try {
          if (process.env.LOCAL !== "true") {
            await saveLocatorsInteraction(type, state);
          }
          response.body = "OK";
        } catch (e) {
          const { message } = e as Error;
          response.statusCode = 500;
          response.body = JSON.stringify({ message });
        }
      }
      break;
    case "OPTIONS":
      response.body = JSON.stringify({ message: "Successful preflight call." });
      break;
    default:
      response.statusCode = 405;
      break;
  }

  return response;
};

export { handler };
