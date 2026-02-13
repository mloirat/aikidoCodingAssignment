const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    endpoints: {
      repos: '/api/repos',
      issues: (repoId) => `/api/repos/${repoId}/issues`,
      fixBackticks: '/api/fix/backticks'
    }
  }
}

export default config

