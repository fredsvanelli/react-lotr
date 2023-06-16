const Config = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.PACKAGE_VERSION,
  },
  api: {
    baseUrl: import.meta.env.VITE_LOTR_API_URL,
    token: import.meta.env.VITE_LOTR_API_ACCESS_TOKEN,
  },
}

export default Config
