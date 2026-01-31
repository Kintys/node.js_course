class HomeControllers {
    renderMainPage = (req, res) => {
        res.render('index', {
            title: 'Автомаркет',
            user: req.user || null
        })
    }
}

export default new HomeControllers()
