import mongodb from "mongodb"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js"

const ObjectId = mongodb.ObjectID
let login

export default class LoginDAO {
  static async injectDB(conn) {
    if (login) {
      return
    }
    try {
      login = await conn.db(process.env.NS).collection("login")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`,
      )
    }
  }


  static async addUser(user) {
    try {
      let userToAdd = {
        username: user.username,
        password: user.password
      }
      const salt = await bcrypt.genSalt(15)
      user.password = await bcrypt.hash(user.password, salt)
      userToAdd.password = user.password
      return await login.insertOne(userToAdd)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { status: 'error', error: e }
    }
  }

  static async loginUser(user) {
    try {
      let compare = false
      const userToAuth = await login.findOne({ username: user.username })
      if (userToAuth) {
        compare = await bcrypt.compare(user.password, userToAuth.password)
      }
      if (userToAuth && compare) {
        return { status: 'success', username: user.username, token: generateToken(userToAuth._id) }
      } else {
        return { status: 'error', error: 'Password or Login are incorrect' }
      }
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { status: 'error', error: e }
    }
  }

}