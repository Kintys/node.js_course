import dotenv from 'dotenv'
dotenv.config()

export default Object.freeze({
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.MONGODB_URL,
    mongoURI: process.env.MONGODB_URL,
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY
})
