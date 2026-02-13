import { getAccessToken } from './auth.service.js'
import config from '../config/app.config.js'

export async function getCodeRepositories() {
  const tokenData = await getAccessToken()
  const token = tokenData.access_token

  const response = await fetch(
    `${config.api.aikido.baseUrl}/repositories/code`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!response.ok) {
    throw new Error('Failed to retrieve repositories')
  }

  return response.json()
}

export async function getRepoIssues(repoId) {
  const tokenData = await getAccessToken()
  const token = tokenData.access_token

  const url = new URL(`${config.api.aikido.baseUrl}/issues/export`)
  url.searchParams.append('repository_id', repoId)

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error(`Aikido API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
