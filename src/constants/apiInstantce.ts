import { authService } from "services/auth.service";
import { createApi } from "../core/utils";
import { getToken, setToken } from "../utils/token";

const apiInstantce = createApi({
    refreshToken: {
        repeat: 3,
        checkRefresh: (response) => response.status === 403,
        refreshService: async () => {
            const token = getToken()
            if (token) {
                const refresh = await authService.refreshToken({ refreshToken: token.refreshToken })
                if (refresh.data.accessToken) {
                    token.accessToken = refresh.data.accessToken
                    setToken(token)
                    return true
                }
            }

            return false
        },
    },
    request: (config: any) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`
        }

        return config
    },
    response: (response) => response.data,
    error: (error) => error
})

export default apiInstantce