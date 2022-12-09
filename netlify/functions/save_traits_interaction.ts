import { Handler } from "@netlify/functions";
import { Response } from "@netlify/functions/dist/function/response";
import Airtable from "airtable";
import invariant from "tiny-invariant";
import { State } from "../../src/components/TraitsBuilderTab";

const saveLocatorsInteraction = async (type: "PNG" | "DDS", state: State) => {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE, AIRTABLE_TRAITS_TABLE } =
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

  invariant(AIRTABLE_API_KEY, "Airtable API key is not defined.");
  invariant(AIRTABLE_BASE, "Airtable base is not defined.");
  invariant(AIRTABLE_TRAITS_TABLE, "Airtable table id is not defined.");

  Airtable.configure({
    apiKey: AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
  });
  const base = Airtable.base(AIRTABLE_BASE);

  return new Promise((resolve, reject) => {
    base(AIRTABLE_TRAITS_TABLE).create(
      {
        name,
        format: type,
        bg_color: bgColor,
        recolor_icon: recolorIcon,
        icon_color: iconColor,
        icon_scale: iconScale,
        icon_x_offset: iconXOffset,
        icon_y_offset: iconYOffset,
        created_at: new Date().toISOString(),
      },
      (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      }
    );
  });
};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const handler: Handler = async (event, _context) => {
  const response: Response = {
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
