import axios from 'axios'
import useApi from '@/hooks/useApi'

const base = axios.create({
  baseURL: 'http://api.gaming.xinchii.com/',
  headers: {
    accept: 'application/json'
  },
  // withCredentials: true
})

export const apiBase = useApi(base)
