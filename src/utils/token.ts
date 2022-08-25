export const TOKEN_STORAGE_KEY = '_token'
export const USER_STORAGE_KEY = '_user'

export const setToken = (data: JSONObject) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(data))
}
export const getToken = <T = any>() => {
    let token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
        token = JSON.parse(token)
    }

    return token as T | null
}

export const clearToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
}


export const setUser = (data: JSONObject) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))
}

export const getUser = <T = any>() => {
    let user = localStorage.getItem(USER_STORAGE_KEY)
    if (user) {
        user = JSON.parse(user)
    }
    return user as T | any
}

export const clearUser = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
}