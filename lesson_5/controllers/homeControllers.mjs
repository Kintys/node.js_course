class HomeControllers {
    renderMainPage = (req, res) => {
        res.render('index', {
            title: 'Автомаркет'
        })
    }
}

export default new HomeControllers()
