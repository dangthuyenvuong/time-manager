import { IconButton } from '@mui/material'
import { Avatar } from 'antd'
import { useUser } from 'hooks/useAuth'

export default function MyAvatar() {

    const { user } = useUser()
    return (
        <IconButton>
            <Avatar style={{ margin: 0 }} src={user?.avatar} />
        </IconButton>
    )
}
