import { getCodeRepositories, getRepoIssues } from '../services/aikido.service.js'

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export const listRepos = asyncHandler(async (req, res) => {
  const repos = await getCodeRepositories()
  res.json(repos)
})

export const getRepoIssuesController = asyncHandler(async (req, res) => {
  const repoId = req.params.id
  const issues = await getRepoIssues(repoId)
  res.json(issues)
})
