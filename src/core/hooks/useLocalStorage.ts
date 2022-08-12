import { useEffect, useState } from "react"

export const useLocalStorage = <T extends any | (() => any) = any>(name: string, defaultValue?: T) : [T, (value: T) => void]=> {
    const [data, setData] = useState<T>(() => {
        let _data = localStorage.getItem(name)
        if (_data) {
            if (typeof defaultValue === 'object') {
                try {
                    return JSON.parse(_data as any)
                } catch (err: any) { 
                    return _data
                }
            }

            if(typeof defaultValue === 'number') return parseFloat(_data)
        }

        return defaultValue

    })
    useEffect(() => {
        localStorage.setItem(name, data as any)
    }, [data, name])

    return [data, setData]
}