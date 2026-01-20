document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData)

    try {
        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        if (response.ok) {
            const ids = await response.json()
            if (window.authRouter) {
                window.authRouter.login(ids)
            }

            window.location.href = '/'
        }
    } catch (error) {
        console.error('Login error:', error)
    }
})
