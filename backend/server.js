import dotenv from 'dotenv'

dotenv.config()

import app from './src/app.js'
import config from './src/config/app.config.js'

app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

app.listen(config.server.port, config.server.host, () => {
  console.log(`Server running on http://${config.server.host}:${config.server.port}`)
})
