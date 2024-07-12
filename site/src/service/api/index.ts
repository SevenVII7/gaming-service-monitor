import { apiBase } from './apiBase'

export * from './palServerStatus'
export const apiTesting = () => {
  const { apiGet, isLoading } = apiBase<void, void, { msg: string }>()
  const doApiTesting = () => apiGet({ path: '/api/testing' })

  return { doApiTesting, isLoading }
}
export const apiAccessible = () => {
  const { apiGet, isLoading } = apiBase<void, void, void, { msg: string }>()
  const doGetAccessible = () => apiGet({ path: '/api/accessible' })

  return { doGetAccessible, isLoading }
}