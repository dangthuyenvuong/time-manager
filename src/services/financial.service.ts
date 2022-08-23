import { FINANCIAL_API } from "config/api";
import apiInstantce from "config/apiInstantce";

const api = apiInstantce.create({
    baseURL: FINANCIAL_API
})

export const financialService = {
    getSoTietKiem(){
        return api.get('/so-tiet-kiem')
    },
    themSoTietKiem(data: any){
        return api.post('/so-tiet-kiem', data)
    },
    deleteSoTietKiem(id: string) {
        return api.delete(`/so-tiet-kiem/${id}`)
    },

    getBill(){
        return api.get('/bill')
    },
    addBill(data: any){
        return api.post('/bill', data)
    },
    deleteBill(id: string) {
        return api.delete(`/bill/${id}`)
    }
}