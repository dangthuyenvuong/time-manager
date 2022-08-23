import { AUTH_API } from "config/api";
import apiInstantce from "config/apiInstantce";

const api = apiInstantce.create({
    baseURL: AUTH_API
})

export const authService = {
    login: (data: any) => api.post('/login', data),
    refreshToken: (data: any) => api.post('/refresh-token', data),
}