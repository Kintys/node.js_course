export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/user')
}

export function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user?.permission?.isAdmin) {
        return next()
    }
    res.status(403).json({ message: 'Forbidden' })
}
