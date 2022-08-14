import { useUser } from 'hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const {user} = useUser()
  if(user) return <Navigate to="/" />
  return (
    <div>
        <Outlet />
    </div>
  )
}
