import express from 'express'
import pal from './gameServer/pal.js'

const router = express()

router.use('/pal', pal)

export default router