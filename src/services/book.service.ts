import { BOOK_API } from "config/api";
import apiInstantce from "config/apiInstantce";

const api = apiInstantce.create({
    baseURL: BOOK_API
})

export const bookService = {
    getBook() {
        return api.get('')
    },
    themBook(data: any) {
        return api.post('', data)
    },
    deleteBook(id: string) {
        return api.delete(`/${id}`)
    },
    editBook(id: string, data: any) {
        return api.patch(`/${id}`, data)
    }

}