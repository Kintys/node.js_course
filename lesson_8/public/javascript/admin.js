document.querySelectorAll('.permissions-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const userId = form.dataset.userId
        const permissionId = form.dataset.permissionId
        const statusEl = form.querySelector('.save-status')

        const formData = new FormData(form)
        const permissions = {
            create: formData.get('create') === 'on',
            read: formData.get('read') === 'on',
            update: formData.get('update') === 'on',
            delete: formData.get('delete') === 'on',
            isAdmin: formData.get('isAdmin') === 'on'
        }

        try {
            statusEl.className = 'save-status'

            const response = await fetch(`/user/admin/${userId}/permissions`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ permissionId, permissions })
            })

            if (response.ok) {
                statusEl.textContent = '✓ Збережено'
                statusEl.className = 'save-status success'
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            } else {
                throw new Error('Помилка збереження')
            }
        } catch (error) {
            statusEl.className = 'save-status error'
            console.error('Error:', error)
        }
    })
})
