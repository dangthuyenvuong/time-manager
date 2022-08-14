import { useUser } from 'hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRequired: React.FC = () => {
    const { user } = useUser()
    if (!user) return <Navigate to="/login" />
    return (
        <Outlet />
    )
}

export default AuthRequired