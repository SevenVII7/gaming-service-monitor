import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) =>{
  try {
    setTimeout(() => {
      const data = {
        protocol: req.protocol, 
        ip: req.ip,
        realIp: req.headers['x-forwarded-for'], 
        baseurl: req.baseUrl,
      }
      res.status(200).json({
        data,
        msg: 'good'
      })
    }, 200);
  } catch (e) {
    next(e)
  }
})

export default router
