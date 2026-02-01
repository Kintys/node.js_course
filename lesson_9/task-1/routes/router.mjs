import homeRouter from './homeRouters.mjs'
import userRouter from './userRouters.mjs'
import productRouter from './productRouters.mjs'
const routerConfigs = [
    {
        path: '/',
        router: homeRouter
    },
    {
        path: '/users',
        router: userRouter
    },
    {
        path: '/product',
        router: productRouter
    }
]

function initRouter(app) {
    for (const config of routerConfigs) {
        app.use(config.path, config.router)
    }
}

export default initRouter
