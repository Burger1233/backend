import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 9999
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { usersList, totalNumUsers } = await UsersDAO.getUsers({
      filters,
      page,
      usersPerPage,
    })

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    }
    res.json(response)
  }
  static async apiGetUserByEmail(req, res, next) {
    try {
      let email = req.params.email || {}
      console.log(email)
      let user = await UsersDAO.getUserByEmail(email)
      if (!user) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json({ status: "success", user })
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await UsersDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiAddUsers(req, res, next) {
    try {
      const userInfo = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        status: req.body.status,
        date: new Date()
      }

      const userAddResponse = await UsersDAO.addUser(
        userInfo
      )
      res.json({ status: "success" })
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateUsers(req, res, next) {
    try {

      const userUpdateResponse = await UsersDAO.updateUser(
        req.body
      )

      var { error } = userUpdateResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (userUpdateResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update user - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateStatus(req, res, next) {
    try {

      const userUpdateResponse = await UsersDAO.updateStatus(
        req.body
      )

      var { error } = userUpdateResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (userUpdateResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update status - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteUsers(req, res, next) {
    try {
      const user_Id = req.query.id
      const userId = req.body.user_id
      console.log(reviewId)
      const response = await UsersDAO.deleteReview(
        user_Id,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}