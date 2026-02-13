import dotenv from 'dotenv'
import { OpenAI } from 'openai'
import config from '../config/app.config.js'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function fixPHPBackticks(code) {
  if (!code) {
    throw new Error('No code provided')
  }

  const prompt = `You are a PHP security expert.
The following code uses backticks (\`\`), which allows Remote Code Execution (RCE).

INSTRUCTIONS:
1. Fix the code using 'escapeshellarg()' or a secure native PHP alternative.
2. Return ONLY the fixed code block.
3. No explanations, no markdown syntax (\`\`\`php).

VULNERABLE CODE:
${code}`

  const completion = await openai.chat.completions.create({
    model: config.api.openai.model,
    messages: [{ role: 'user', content: prompt }],
    temperature: config.api.openai.temperature
  })

  return completion.choices[0].message.content.trim()
}
