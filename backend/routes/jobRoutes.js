const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const {postJob,getAllJobs,getJobById,getAdminJobs} = require('../controllers/jobController')

const router = express.Router()

router.route('/post').post(isAuthenticated,postJob)
router.route('/get').get(isAuthenticated,getAllJobs)
router.route('/get/:id').get(isAuthenticated,getJobById)
router.route('/getAdmin').get(isAuthenticated,getAdminJobs)

module.exports = router