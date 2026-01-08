
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    GITHUB_TOKEN?: string;
    VITE_GITHUB_TOKEN?: string;
    REACT_APP_GITHUB_TOKEN?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
