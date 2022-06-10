import LoginDAO from "../dao/loginDAO.js"

export default class LoginController {

  static async apiRegister(req, res, next) {
    try {
      const userInfo = {
        username: req.body.username,
        password: req.body.password
      }

      const userAddResponse = await LoginDAO.addUser(userInfo)
      if (userAddResponse.status !== 'error') {
        res.json({ status: "success", userAddResponse })
      } else {
        res.json({ status: 'error', error: userAddResponse.error })
      }
    } catch (e) {
      res.status(500).json({ error: e })
    }
  }

  static async apiLogin(req, res, next) {
    try {
      const userInfo = {
        username: req.body.username,
        password: req.body.password
      }

      const userAddResponse = await LoginDAO.loginUser(userInfo)
      res.json(userAddResponse)
    } catch (e) {
      res.status(500).json({ error: e })
    }
  }

}