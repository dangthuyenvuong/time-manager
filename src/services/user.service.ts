import { USER_API } from "constants/api";
import apiInstantce from "constants/apiInstantce";

const api = apiInstantce.create({
    baseURL: USER_API,
})

export const userService = {
    getProfile: () => api.get<User>('/'),
    updateProfile: (data: any) => api.patch('/', data),
    changePassword: (data: any) => api.post('/change-password', data),
    register: (data: any) => api.post('/register',data),
    forgotPassword: (data: any) => api.post('/forgot-password', data)
}