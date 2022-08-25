import { DotsVerticalIcon } from '@heroicons/react/solid'
import { IconButton } from '@mui/material'
import { Dropdown, Menu } from 'antd'
import { ReactNode, useMemo } from 'react'

export const ThreeDotAction: React.FC<{
    menu: { label: ReactNode }[]
}> = ({ menu }) => {

    const _menu = useMemo(() => menu.map((e: any, i: number) => ({ ...e, key: i })), [])

    return (
        <Dropdown overlay={<Menu
            items={_menu}
        />} arrow={{ pointAtCenter: true }} placement="bottomRight">
            <IconButton onClick={e => e.stopPropagation()}><DotsVerticalIcon style={{ width: 15 }} /></IconButton>
        </Dropdown>
    )
}
