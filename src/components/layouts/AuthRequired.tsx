import { useUser } from 'hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthRequired: React.FC = () => {
    const { user } = useUser()
    if (!user) return <Navigate to="/login" />
    return (
        <Outlet />
    )
}
