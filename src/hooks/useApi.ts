import axios, { AxiosError, Method, AxiosInstance, AxiosRequestConfig } from 'axios'
import { ref, Ref } from 'vue'

type ApiParams<T, K> = { path: string; params?: T; data?: K }

export default function useApi(apiInstance: AxiosInstance) {
  return <ReqParams = void, ReqBody = void, Res = void, ErrorRes = void>() => {
    const isLoading = ref(false)
    const resData = ref<Res>() as Ref<Res>
    const errData = ref<ErrorRes>() as Ref<ErrorRes>
    const reqBase = (reqConfig: AxiosRequestConfig<ReqBody>) => {
      isLoading.value = true
      return apiInstance(reqConfig)
        .then((res) => {
          resData.value = res.data
          return resData
        })
        .catch((err: AxiosError<ErrorRes>) => {
          if (axios.isAxiosError(err)) {
            const data = err.response?.data as ErrorRes
            const status = err.response?.status
            errData.value = data
          }
          throw err
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    const apiGet = ({ path, params }: ApiParams<ReqParams, ReqBody>, customConfig?: AxiosRequestConfig) =>
      reqBase({ method: 'GET', url: path, params, ...customConfig })
    const apiPost = ({ path, params, data }: ApiParams<ReqParams, ReqBody>, customConfig?: AxiosRequestConfig) =>
      reqBase({ method: 'POST', url: path, params, data, ...customConfig })
    const apiDelete = ({ path, params, data }: ApiParams<ReqParams, ReqBody>, customConfig?: AxiosRequestConfig) =>
      reqBase({ method: 'DELETE', url: path, params, data, ...customConfig })
    const apiPut = ({ path, params, data }: ApiParams<ReqParams, ReqBody>, customConfig?: AxiosRequestConfig) =>
      reqBase({ method: 'PUT', url: path, params, data, ...customConfig })
    const apiPatch = ({ path, params, data }: ApiParams<ReqParams, ReqBody>, customConfig?: AxiosRequestConfig) =>
      reqBase({ method: 'PATCH', url: path, params, data, ...customConfig })

    return {
      apiGet,
      apiPost,
      apiDelete,
      apiPut,
      apiPatch,
      isLoading,
      resData,
      errData
    }
  }
}
