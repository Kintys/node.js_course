class StaticDataService {
    getNavigationLinks() {
        return [
            {
                name: '(/about) About – як статична сторінка (розмістити у public)',
                url: '/about'
            },
            {
                name: '(/product) Cторінка відображення продуктів (у формі таблиці і списку)',
                url: '/product'
            },
            {
                name: '(/addProduct) Cторінка додавання продукту (поки лише відображаємо поля для заповнення інформації)',
                url: '/addProduct'
            }
        ]
    }

    getWelcomeText() {
        return 'Вітаємо на нашому сайті! Ми раді, що ви завітали до нас. Насолоджуйтесь переглядом та знаходьте корисну інформацію.'
    }
}

export default StaticDataService
