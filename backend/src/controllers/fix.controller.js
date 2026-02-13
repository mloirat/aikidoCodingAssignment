import { fixPHPBackticks } from '../services/openai.service.js'

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export const fixBackticks = asyncHandler(async (req, res) => {
  const { code } = req.body
  const fixedCode = await fixPHPBackticks(code)
  res.json({ fixedCode })
})

