document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('authLink')

    if (authLink && localStorage.getItem('user')) {
        authLink.textContent = `Вихід (Logout)`
        authLink.href = '#'
        authLink.addEventListener('click', (e) => {
            e.preventDefault()
            if (window.authRouter) {
                window.authRouter.logout()
            } else {
                localStorage.removeItem('user')
                window.location.href = '/user'
            }
        })
    }

    const carsLink = document.getElementById('carsLink')
    const permId = localStorage.getItem('permId')
    if (carsLink && !!permId) {
        carsLink.href = `/cars/${permId}`
    }
})
