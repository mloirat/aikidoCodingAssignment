import express from 'express'
import { fixBackticks } from '../controllers/fix.controller.js'

const router = express.Router()

router.post('/backticks', fixBackticks)

export default router

