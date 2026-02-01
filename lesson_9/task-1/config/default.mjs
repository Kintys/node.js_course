import dotenv from 'dotenv'
dotenv.config()

export default Object.freeze({
    dbName: process.env.DATABASE_NAME,
    dbUrl: process.env.MONGODB_URL,
    mongoURI: process.env.MONGODB_URL,
    port: process.env.PORT,
    secretKey: process.env.SESSION_KEY
})
