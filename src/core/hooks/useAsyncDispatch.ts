import { useState } from "react"
import { useDispatch } from "react-redux"

export const useAsyncAction = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    
}