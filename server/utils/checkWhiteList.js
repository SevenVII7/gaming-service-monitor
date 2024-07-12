import dotenv from 'dotenv'
dotenv.config()

export const checkWhiteList = (ip) =>{
  const allowIds = process.env.WHITE_LIST_IP.split(',');
  return allowIds.includes(ip)
}