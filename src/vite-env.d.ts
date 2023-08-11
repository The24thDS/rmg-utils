/// <reference types="vite/client" />
declare const APP_VERSION: string;
declare const ENVIRONMENT: "local" | "dev" | "stage" | "production";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface ImportMetaEnv {
  readonly VITE_NETLIFY_FUNCTIONS_LOCAL_SERVER: string;
  readonly VITE_ERROR_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  umami: { track: (name: string, data?: { [key: string]: any }) => void };
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}

interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent;
}
