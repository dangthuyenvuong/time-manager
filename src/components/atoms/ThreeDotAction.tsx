import { DotsVerticalIcon } from '@heroicons/react/solid'
import { IconButton } from '@mui/material'
import { Dropdown, Menu } from 'antd'
import { ReactNode, useMemo } from 'react'

export const ThreeDotAction: Atom<{
    menu: { label: ReactNode }[]
}> = ({ menu }) => {

    const _menu = useMemo(() => menu.map((e: any, i: number) => ({ ...e, key: i })), [])

    return (
        <Dropdown overlay={<Menu 
            items={_menu}
        />} arrow={{ pointAtCenter: true }} placement="bottomRight">
            <IconButton><DotsVerticalIcon style={{ width: 15 }} /></IconButton>
        </Dropdown>
    )
}
