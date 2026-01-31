import passport from '../module/user/userPassport.mjs'

class AuthController {
    constructor(moduleInstance) {
        this.passport = moduleInstance
    }
    loginUser = async (req, res, next) => {
        this.passport.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) {
                return res.status(400).render('user/login', {
                    title: 'Login',
                    errors: info.errors || [],
                    user: req.body || {},
                    currentUser: req.user || null
                })
            }

            req.login(user, (err) => {
                if (err) return next(err)

                res.redirect('/')
            })
        })(req, res, next)
    }

    logoutUser = async (req, res) => {
        req.logout((err) => {
            if (err) return res.status(500).json({ message: 'Logout failed' })
            res.redirect('/')
        })
    }
}

export default new AuthController(passport)
