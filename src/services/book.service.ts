import { BOOK_API } from "config/api";
import apiInstantce from "config/apiInstantce";

const api = apiInstantce.create({
    baseURL: BOOK_API
})

export const bookService = {
    getBookDetail(id: string){
        return api.get(id)
    },
    getBook(query = '') {
        return api.get(`/read${query}`)
    },
    themBook(data: any) {
        return api.post('/read', data)
    },
    deleteBook(id: string) {
        return api.delete(`/read/${id}`)
    },
    editBook(id: string, data: any) {
        return api.patch(`/read/${id}`, data)
    },

    getCategories() {
        return api.get('/category')
    },
    getReadToday(){
        return api.get('/log/today')
    }

}