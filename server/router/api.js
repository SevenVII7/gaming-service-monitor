import express from 'express'
import testing from './api/testing.js'
import accessible from './api/accessible.js'

const router = express()

router.use('/testing', testing)
router.use('/accessible', accessible)

export default router