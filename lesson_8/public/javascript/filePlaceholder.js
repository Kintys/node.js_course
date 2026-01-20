function handleImageInput(event) {
    console.log(event)
    const file = event.target.files[0]
    if (file) {
        const imgEl = document.getElementById('carImage')
        const reader = new FileReader()
        reader.onload = function (e) {
            imgEl.src = e.target.result
        }
        reader.readAsDataURL(file)
    }
}
