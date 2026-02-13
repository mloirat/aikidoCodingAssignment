import config from '../config/app.config.js'

export async function getAccessToken() {
  const authHeader = Buffer.from(
    `${process.env.AIKIDO_CLIENT_ID}:${process.env.AIKIDO_CLIENT_SECRET}`
  ).toString('base64')

  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  const response = await fetch(config.api.aikido.oauth.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authHeader}`
    },
    body: params
  })

  if (!response.ok) {
    throw new Error('Failed to retrieve access token')
  }

  return response.json()
}
