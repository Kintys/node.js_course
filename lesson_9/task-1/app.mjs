import express from 'express'

import middleware from './middleware/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'
import initRouter from './routes/router.mjs'
import connectDB from './db/connectDB.mjs'

const app = express()

connectDB()

middleware(app)

initRouter(app)

errorHandler(app)

export default app
