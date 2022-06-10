import express from 'express'
import UsersnbCntrl from './usersnb.controller.js'

const router = express.Router()

router.route("/getUsers").get(UsersnbCntrl.apiGetUsers)
router.route("/getUser/:email").get(UsersnbCntrl.apiGetUserByEmail)
router.route("/getUser/id/:id").get(UsersnbCntrl.apiGetUserById)

router.route('/addUser').post(UsersnbCntrl.apiAddUsers)
router.route('/deleteUser').post(UsersnbCntrl.apiDeleteUsers)
router.route('/updateUser').post(UsersnbCntrl.apiUpdateUsers)
router.route('/updateStatus').post(UsersnbCntrl.apiUpdateStatus)

export default router