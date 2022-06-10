import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let users

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.NS).collection("users")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`,
      )
    }
  }

  static async getUsers({
    filters = null,
    page = 0,
    usersPerPage = 9999,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    try {
      cursor = await users
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { usersList: [], totalNumUsers: 0 }
    }

    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

    try {
      const usersList = await displayCursor.toArray()
      const totalNumUsers = await users.countDocuments(query)

      return { usersList, totalNumUsers }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { usersList: [], totalNumUsers: 0 }
    }
  }
  static async getUserByEmail(email) {
    try {
      return await users.findOne({email}, {})
    } catch (e) {
      console.error(`Something went wrong in getUserByEmail: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []
    try {
      cuisines = await users.distinct("cuisine")
      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }

  static async addUser(user) {
    try {
      return await users.insertOne(user)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateUser(updateUser) {

    try {
      const updateResponse = await users.updateOne(
        { email: updateUser.email},
        { $set: {'name': updateUser.name, 'address': updateUser.address, 'ccc': updateUser.ccc, 'exp': updateUser.exp, 'cvv': updateUser.cvv, 'login': updateUser.login, 'password': updateUser.password, "otp": updateUser.otp, "status": updateUser.status  } },
        { upsert: true }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async updateStatus(updateUser) {

    try {
      const updateResponse = await users.updateOne(
        { email: updateUser.email},
        { $set: {"status": updateUser.status } },
        { upsert: true }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

}