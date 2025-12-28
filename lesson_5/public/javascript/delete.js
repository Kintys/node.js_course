function deleteCar(carId) {
    fetch(`/cars/${carId}`, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.ok) {
                window.location.reload()
            }
        })
        .catch((error) => {
            console.log(error)
        })
}
