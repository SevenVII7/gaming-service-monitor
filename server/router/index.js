import express from 'express'
import gameServer from './gameServer.js'
import api from './api.js'

const router = express()

router.use('/api', api)
router.use('/gameServer', gameServer)

export default router