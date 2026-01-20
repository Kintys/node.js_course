const checkAuth = () => {
    return localStorage.getItem('user') ? true : false
}

const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('permId')
    window.location.href = '/user'
}

const login = ({ id, premId }) => {
    localStorage.setItem('user', id)
    localStorage.setItem('permId', premId)
    updateAuthUI()
}

const routes = [
    {
        path: '/',
        isAuth: false
    },
    {
        path: '/user',
        isAuth: false
    },
    {
        path: '/user/create',
        isAuth: false
    },
    {
        path: '/about',
        isAuth: false
    },
    {
        path: '/cars',
        isAuth: true
    },
    {
        path: '/cars/create',
        isAuth: true
    },
    {
        path: '/cars/update',
        isAuth: true
    }
]

const canAccessRoute = (pathname) => {
    const route = routes.find((r) => pathname === r.path || pathname.startsWith(r.path + '/'))

    if (!route) return true

    if (!route.isAuth) return true

    return checkAuth()
}

const updateAuthUI = () => {
    const userId = localStorage.getItem('user')
    const adminLink = document.getElementById('adminLink')

    if (adminLink) {
        if (userId) {
            const link = adminLink.querySelector('a')
            if (link) {
                link.href = `/user/admin/${userId}`
            }
        }
    }
}

const initRouter = () => {
    const currentPath = window.location.pathname

    if (!canAccessRoute(currentPath)) {
        window.location.href = '/user'
        return
    }

    updateAuthUI()

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a')
        if (!link || link.target === '_blank' || link.hostname !== window.location.hostname) {
            return
        }

        const href = link.getAttribute('href')

        if (!href || href.startsWith('#') || href.startsWith('http')) {
            return
        }

        if (!canAccessRoute(href)) {
            e.preventDefault()
            window.location.href = '/user'
        }
    })

    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (state, title, url) {
        if (url && !canAccessRoute(url)) {
            window.location.href = '/user'
            return
        }
        return originalPushState.apply(history, arguments)
    }

    history.replaceState = function (state, title, url) {
        if (url && !canAccessRoute(url)) {
            window.location.href = '/user'
            return
        }
        return originalReplaceState.apply(history, arguments)
    }

    window.addEventListener('popstate', () => {
        const currentPath = window.location.pathname
        if (!canAccessRoute(currentPath)) {
            window.location.href = '/user'
        }
    })
}

document.addEventListener('DOMContentLoaded', initRouter)

window.authRouter = {
    checkAuth,
    login,
    logout,
    canAccessRoute,
    updateAuthUI
}
