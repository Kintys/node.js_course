// function submitCarForm(id) {
//     const form = document.getElementById('carsForm')

//     if (!form) return

//     form.addEventListener('submit', async (e) => {
//         e.preventDefault()

//         const formData = new FormData(form)
//         const car = Object.fromEntries(formData)

//         const userId = localStorage.getItem('user') || ''

//         car.owner = userId

//         const url = id ? `/cars/update/${id}` : '/cars/create'
//         try {
//             await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(car)
//             })
//         } catch (error) {
//             console.error('Registration error:', error)
//         }
//     })
// }

function submitCarForm() {
    const form = document.getElementById('carForm')

    if (!form) return

    form.addEventListener('submit', (e) => {
        const userId = localStorage.getItem('user') || ''

        let ownerInput = form.querySelector('input[name="owner"]')

        ownerInput.value = userId
    })
}

document.addEventListener('DOMContentLoaded', submitCarForm)
