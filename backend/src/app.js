import express from 'express'
import cors from 'cors'
import repoRoutes from './routes/repo.routes.js'
import fixRoutes from './routes/fix.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/repos', repoRoutes)
app.use('/api/fix', fixRoutes)

export default app
