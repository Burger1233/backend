import app from "./server.js"
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import UsersDAO from './dao/usersDAO.js'
import LoginDAO from './dao/loginDAO.js'
import UsersnbDAO from './dao/usersnbDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT

MongoClient.connect(
    process.env.ATLAS_URI,
    {
        wtimeoutMS: 2500
    }
).catch(err => {
    console.log(err)
    process.exit(1)
})
    .then(async client => {
        await UsersDAO.injectDB(client)
        await LoginDAO.injectDB(client)
        await UsersnbDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`)
        })
    })