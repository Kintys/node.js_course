import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { userServices } from './userModule.mjs'

class PassportConfig {
    constructor(dataProvider) {
        this.db = dataProvider
        this.passport = passport
        this.initialize()
    }

    initialize() {
        this.setupLocalStrategy()
        this.setupSerialization()
    }

    async validateCredentials(username, password) {
        const errors = new Map()

        const user = await this.db.getByName(username)
        if (!user) {
            errors.set('name', 'Incorrect name.')
            return { errors, user: null }
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            errors.set('password', 'Incorrect password.')
        }

        return { errors, user }
    }

    formatErrors(errorsMap) {
        return Array.from(errorsMap, ([path, message]) => ({
            path: [path],
            message
        }))
    }

    setupLocalStrategy() {
        this.passport.use(
            new LocalStrategy(
                { usernameField: 'name', passwordField: 'password' },
                async (username, password, done) => {
                    try {
                        const { errors, user } = await this.validateCredentials(username, password)

                        if (errors.size > 0) {
                            const errorArray = this.formatErrors(errors)
                            return done(null, false, { errors: errorArray })
                        }

                        return done(null, user)
                    } catch (error) {
                        return done(error)
                    }
                }
            )
        )
    }

    setupSerialization() {
        this.passport.serializeUser((user, done) => {
            done(null, user._id)
        })

        this.passport.deserializeUser(async (id, done) => {
            try {
                const foundUser = await this.db.getById(id)
                if (!foundUser) {
                    return done(null, null)
                }
                const user = { id: foundUser._id, name: foundUser.name, permission: { ...foundUser.permission._doc } }
                done(null, user)
            } catch (error) {
                console.error('Deserialization error:', error)
                done(null, null)
            }
        })
    }

    getInstance() {
        return this.passport
    }
}

const passportConfig = new PassportConfig(userServices)
export default passportConfig.getInstance()
