import express from 'express'
import { checkWhiteList } from '../../utils/checkWhiteList.js'

const router = express.Router()

router.get('/', (req, res, next) =>{
  try {
    const ip = req.headers['x-forwarded-for']
    const accessAble = checkWhiteList(ip)
    if (accessAble) {
      res.status(200).send()
    } else {
      res.status(401).json({ msg: 'permission denied by ip not allowed' })
    }
  } catch (e) {
    next(e)
  }
})

export default router
