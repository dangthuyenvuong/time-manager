import { SETTING_API } from "config/api";
import apiInstantce from "config/apiInstantce";

const api = apiInstantce.create({
    baseURL: SETTING_API
})

export const settingService = {
    getSetting(){
        return api.get('')
    },
    updateSetting(data: any) {
        return api.patch('', data)
    }
}