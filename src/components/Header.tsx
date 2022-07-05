import { Button, Dropdown, Menu, PageHeader, Switch } from "antd";
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { IconButton } from "@mui/material";
import styled from 'styled-components'

const MenuWrap = styled.label`
    min-width: 200px;
    cursor: pointer;
`
export default function Header() {
    return (
        <PageHeader
            title="Đặng Thuyền Vương"
            subTitle="Quản lý thời gian"
            onBack={() => null}
            extra={[
                <Dropdown
                    trigger={['click']}
                    overlay={<Menu 
                        items={[
                            {
                                label: <MenuWrap className="flex justify-between items-center">Dark mode <Switch size="small" /></MenuWrap>,
                                key: 1
                            },
                            {
                                label: <MenuWrap className="flex justify-between items-center">Setting</MenuWrap>,
                                key: 2
                            },
                            
                        ]}
                    />}
                >
                    <IconButton><DotsVerticalIcon className="w-5 h-5 text-gray-500" /></IconButton>
                </Dropdown>
            ]}
        />
    )
}
