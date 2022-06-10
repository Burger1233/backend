import express from 'express'
import UsersCntrl from './users.controller.js'

const router = express.Router()

router.route("/getUsers").get(UsersCntrl.apiGetUsers)
router.route("/getUser/:email").get(UsersCntrl.apiGetUserByEmail)


router.route('/addUser').post(UsersCntrl.apiAddUsers)
router.route('/deleteUser').post(UsersCntrl.apiDeleteUsers)
router.route('/updateUser').post(UsersCntrl.apiUpdateUsers)
router.route('/updateStatus').post(UsersCntrl.apiUpdateStatus)

export default router