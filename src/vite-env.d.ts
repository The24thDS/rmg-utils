/// <reference types="vite/client" />
declare const APP_VERSION: string;

interface ImportMetaEnv {
  readonly VITE_NETLIFY_FUNCTIONS_LOCAL_SERVER: string;
  readonly VITE_ERROR_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
