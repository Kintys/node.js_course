import indexRouter from './homeRouter.mjs'
import bookRouter from './booksRouter.mjs'

const routerConfigs = [
    {
        path: '/',
        router: indexRouter
    },
    {
        path: '/books',
        router: bookRouter
    }
]

function initRouter(app) {
    for (const config of routerConfigs) {
        app.use(config.path, config.router)
    }
}

export default initRouter
