import { useSelector } from "react-redux"
import { StoreType } from "stores"

export const useAuth = () => useSelector((store: StoreType) => store.auth)
export const useUser = () => useSelector((store: StoreType) => store.user)