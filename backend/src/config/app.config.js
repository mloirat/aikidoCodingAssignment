const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },
  api: {
    aikido: {
      baseUrl: 'https://app.aikido.dev/api/public/v1',
      oauth: {
        url: 'https://app.aikido.dev/api/oauth/token'
      }
    },
    openai: {
      model: 'gpt-4o-mini',
      temperature: 0
    }
  }
}

export default config
