import { FINANCIAL_API } from "constants/api";
import apiInstantce from "constants/apiInstantce";

const api = apiInstantce.create({
    baseURL: FINANCIAL_API
})

export const financialService = {
    getSoTietKiem(){
        return api.get('/so-tiet-kiem')
    },
    themSoTietKiem(data: any){
        return api.post('/so-tiet-kiem', data)
    }
}