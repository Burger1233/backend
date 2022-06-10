import express from 'express'
import LoginCntrl from './login.controller.js'

const router = express.Router()

//router.route("/register").post(LoginCntrl.apiRegister)
router.route("/").post(LoginCntrl.apiLogin)


export default router