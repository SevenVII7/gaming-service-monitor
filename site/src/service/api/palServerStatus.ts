import { apiBase } from './apiBase'

export const apiGetStatus = () => {
  const { apiGet, isLoading } = apiBase<void, void, { msg: string }>()
  const doGetStatus = () => apiGet({ path: '/gameServer/pal/status' })

  return { doGetStatus, isLoading }
}
export const apiStartServer = () => {
  const { apiPost, isLoading } = apiBase<void, void, { msg: string }>()
  const doStartServer = () => apiPost({ path: '/gameServer/pal/start' })

  return { doStartServer, isLoading }
}
export const apiStopServer = () => {
  const { apiPost, isLoading } = apiBase<void, void, { msg: string }>()
  const doStopServer = () => apiPost({ path: '/gameServer/pal/stop' })

  return { doStopServer, isLoading }
}