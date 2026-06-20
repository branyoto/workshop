/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CMS_URL: string;
  readonly VITE_CMS_IMAGE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
