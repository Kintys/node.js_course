import { createServer } from 'node:http'
import { getEmployeeNameByUrl } from './User.mjs'

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })

    const employeeName = getEmployeeNameByUrl(req.url)

    if (employeeName) {
        res.end(`${employeeName}\n`)
    } else {
        res.end('Введіть посилання на працівника для отримання імені: /director, /manager, або /driver\n')
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000')
})
