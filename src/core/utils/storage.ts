const ISSERVER = !!window
class LocalStorage {
    set(name: string, value: any) { // eslint-disable-line
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        if (!ISSERVER) {
            localStorage.setItem(name, value as string)
        }
    }

    get<T = any>(name: string, defaultValue?: T): T {// eslint-disable-line
        if (!ISSERVER) {
            const value = localStorage.getItem(name) as string
            if (!value) return defaultValue as T
            try {
                return JSON.parse(value) as T
            } catch (error) {
                return value as unknown as T
            }
        }
        return {} as unknown as T
    }

    delete(name: string) {
        if (!ISSERVER) {
            localStorage.removeItem(name)
        }
    }

    check(name: string) {
        if (!ISSERVER) {
            return !!localStorage.getItem(name)
        }
        return false
    }
}

export const storage = new LocalStorage()
