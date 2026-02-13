import express from 'express'
import { listRepos, getRepoIssuesController } from '../controllers/repo.controller.js'

const router = express.Router()

router.get('/', listRepos)
router.get('/:id/issues', getRepoIssuesController)

export default router
