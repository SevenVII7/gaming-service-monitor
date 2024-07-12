import express from 'express'
import getPalServerStatus from '../../controller/getPalServerStatus.js'
import startPalServerStatus from '../../controller/startPalServer.js'
import stopPalServerStatus from '../../controller/stopPalServer.js'

const router = express.Router()

router.get('/status', getPalServerStatus)
router.post('/start', startPalServerStatus)
router.post('/stop', stopPalServerStatus)

export default router