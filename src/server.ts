import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = process.env['PORT'] || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../public')))

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

function closeServer(signal: string) {
  console.log(`${signal} signal received: closing HTTP server`)
  server.close(() => {
    console.log('HTTP server closed')
  })
}

process.on('SIGTERM', closeServer)
process.on('SIGUSR2', closeServer)
