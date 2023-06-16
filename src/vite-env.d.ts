/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string
  readonly PACKAGE_VERSION: string
  readonly VITE_LOTR_API_URL?: string
  readonly VITE_LOTR_API_ACCESS_TOKEN?: string
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
