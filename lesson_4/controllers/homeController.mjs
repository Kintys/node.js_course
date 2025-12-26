class HomeController {
    renderIndexPage = (req, res) => {
        res.render('index', {
            title: 'Books Manager'
        })
    }
}

export default new HomeController()
