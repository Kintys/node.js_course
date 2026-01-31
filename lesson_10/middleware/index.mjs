import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import loggerConfig from '../config/logger.mjs'

import sessionConfig from '../config/session.mjs'
import flash from 'connect-flash'
import passport from '../module/user/userPassport.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const middleware = (app) => {
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs')

    app.use(loggerConfig)
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())

    app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html'] }))

    app.use('/images', express.static(path.join(__dirname, '../uploads')))

    app.use(sessionConfig)
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
}

export default middleware
