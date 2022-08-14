import { AUTH_API } from "constants/api";
import apiInstantce from "constants/apiInstantce";

const api = apiInstantce.create({
    baseURL: AUTH_API
})

export const authService = {
    login: (data: any) => api.post('/login', data),
    refreshToken: (data: any) => api.post('/refresh-token', data),
}