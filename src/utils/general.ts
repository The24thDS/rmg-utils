import { NetlifyFunctions } from "../constants";

export const dateFormatter = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const netlifyFunctionInvoke = async (
  name: NetlifyFunctions,
  headers = {},
  body: Object | undefined,
  options = { method: "POST" }
) => {
  let url = "";
  // add host for local dev
  if (import.meta.env.DEV) {
    url += import.meta.env.VITE_NETLIFY_FUNCTIONS_LOCAL_SERVER;
  }
  // add netlify function path
  url += `/.netlify/functions/${name}`;

  const response = await fetch(url, {
    ...options,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  let content = await response.text();

  try {
    content = JSON.parse(content);
  } catch (e) {
    // content is not JSON
  }

  return content;
};

export const isDNTEnabled = () => navigator.doNotTrack === "1";

export const getEnvironment = () => {
  if (import.meta.env.DEV) {
    return "development";
  } else if (location.hostname === "develop--rmg-utils.netlify.app") {
    return "staging";
  } else {
    return "production";
  }
};

interface HSLValue {
  h?: number;
  s?: number;
  l?: number;
}

export const modifyHSLValue = (value: string, changes: HSLValue) => {
  const regExp = new RegExp("[0-9]+", "g");
  let [h = 0, s = 0, l = 0] = value.match(regExp)?.map(Number) ?? [];
  h += changes.h ?? 0;
  s += changes.s ?? 0;
  l += changes.l ?? 0;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const isAnalyticsEnabled = import.meta.env.PROD && !isDNTEnabled();
