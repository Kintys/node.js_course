function isPasswordMatch(password, confirmPass) {
    return password.trim() === confirmPass.trim()
}

function showError(input, message) {
    const existingError = input.parentElement.querySelector('.error-message')

    if (existingError) {
        existingError.remove()
    }

    const errorElement = document.createElement('small')
    errorElement.className = 'error-message'
    errorElement.textContent = message
    errorElement.style.color = 'red'
    input.parentElement.appendChild(errorElement)

    input.style.borderColor = 'red'
}

function clearError(input) {
    const error = input.parentElement.querySelector('.error-message')
    if (error && !error.textContent.includes('Довжина')) {
        error.remove()
    }
    input.style.borderColor = ''
}

function submitUserForm() {
    const form = document.getElementById('createForm')

    if (!form) return

    const confirmInput = form.querySelector('input[name="confirm"]')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const user = Object.fromEntries(formData)

        let isValid = true

        if (user.password && user.confirm) {
            if (!isPasswordMatch(user.password, user.confirm)) {
                showError(confirmInput, 'Паролі не співпадають!')
                isValid = false
            }
        }

        if (isValid) {
            try {
                const response = await fetch('/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
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
        }
    })
}

document.addEventListener('DOMContentLoaded', submitUserForm)
