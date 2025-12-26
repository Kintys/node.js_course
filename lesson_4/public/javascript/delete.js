function deleteBook(bookId) {
    fetch(`/books/${bookId}`, {
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
