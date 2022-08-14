import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type ApiOptions = {
    request?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    response?: (res: AxiosResponse) => any,
    error?: (error: any) => any
    refreshToken?: {
        checkRefresh: (response: any) => boolean
        refreshService: () => Promise<boolean>,
        repeat?: number
    }
    config?: AxiosRequestConfig
}
let refreshPromise: any
export const createApi = (options?: ApiOptions) => {
    return {
        create(config?: AxiosRequestConfig) {
            const api = axios.create({
                ...options?.config,
                ...config
            })

            api.interceptors.request.use((config) => {
                options?.request?.(config)
                return config
            })
            api.interceptors.response.use((res) => {
                const _res = options?.response?.(res)
                return _res
            }, async (error) => {
                // handle response
                // handle refresh token
                // handle error
                let repeat = options?.refreshToken?.repeat || 1
                if (options?.refreshToken?.checkRefresh(error.response)) {

                    const refresh = async () => {
                        if (options.refreshToken) {
                            if (!refreshPromise) {
                                refreshPromise = options.refreshToken.refreshService()
                            }

                            const res = await refreshPromise
                            refreshPromise = null
                            return res
                        }
                        return false
                    }
                    while (repeat > 0) {
                        const res = await refresh()
                        if (res) {
                            return api(error.config)
                        }
                        repeat--
                    }

                }

                return options?.error?.(error)

                // return error.response.data
            })
            return api
        }
    }
}


export default createApi