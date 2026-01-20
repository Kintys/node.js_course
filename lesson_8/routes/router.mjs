import homeRouter from './homeRouter.mjs'
import carsRouter from './carsRouters.mjs'
import userRouter from './userRouters.mjs'
const routerConfigs = [
    {
        path: '/',
        router: homeRouter
    },
    {
        path: '/cars',
        router: carsRouter
    },
    {
        path: '/user',
        router: userRouter
    }
]

function initRouter(app) {
    for (const config of routerConfigs) {
        app.use(config.path, config.router)
    }
}

export default initRouter
