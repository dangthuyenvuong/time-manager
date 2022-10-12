import { useLocalStorage } from "core"
import { useEffect } from "react"
import { settingService } from "services/setting.service"

let setting: any = null
let promise: any = null
export const useSetting = <T>(name: string, defautlvalue: T) => {
    const res = useLocalStorage(name, defautlvalue)
    useEffect(() => {
        if (setting) {
            if (setting[name] && setting[name] !== res[0]) {
                res[1](setting[name])
            }
            return
        }

        if (promise) {

            promise.then((res1: any) => {

                if (res1[name] && res1[name] !== res[0]) {
                    res[1](res1[name])
                }
            })

            return
        }

        promise = settingService.getSetting().then(res1 => {
            setting = res1.data
            if (setting[name] && setting[name] !== res[0]) {
                res[1](setting[name])
            }
            return setting
        })

    }, [])

    useEffect(() => {
        (async () => {

            if (res[0] && setting !== null && res[0] !== setting[name]) {
                setting[name] = res[0]
                await settingService.updateSetting({ [name]: res[0] })
            }
        })()
    }, [res[0], ])

    return res
}