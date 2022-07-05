import { DotsVerticalIcon, ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { IconButton } from "@mui/material";
import { Avatar, Dropdown, Menu, Modal, PageHeader, Switch, Tabs, Typography } from "antd";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Title } = Typography
const { TabPane } = Tabs
const MenuWrap = styled.label`
    min-width: 200px;
    cursor: pointer;
`
export default function Header() {
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    return (
        <>
            <PageHeader
                title="Quản lý thời gian"
                onBack={() => null}
                backIcon={<IconButton><ArrowNarrowLeftIcon className="w-5 h-5 text-gray-500" /></IconButton>}
                extra={[
                    <Link to="/profile">
                        <IconButton>
                            <Avatar style={{margin: 0}} src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/272402486_1909889179213797_8623708736851518609_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9MYQptuU8XEAX-LEIDN&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8nTf4FrH2MEltjQiyq_fqT4SeRadVnJyn3jW4HraBDPw&oe=62C862C8" />
                        </IconButton>
                        <span className='text-gray-500'>Đặng Thuyền Vương</span>
                    </Link>,
                    <Dropdown
                        trigger={['click']}
                        visible={isOpenDropdown}
                        onVisibleChange={open => setIsOpenDropdown(open)}
                        overlay={<Menu
                            items={[
                                {
                                    label: <MenuWrap className="flex justify-between items-center">Dark mode <Switch size="small" /></MenuWrap>,
                                    key: 1
                                },
                                {
                                    label: <MenuWrap className="flex justify-between items-center" onClick={() => setIsOpenSetting(true)}>Setting</MenuWrap>,
                                    key: 2
                                },

                            ]}
                        />}
                    >
                        <IconButton onClick={e => e.stopPropagation()}><DotsVerticalIcon className="w-5 h-5 text-gray-500" /></IconButton>
                    </Dropdown>
                ]}
            />

            <Modal
                title={'Settings'}
                centered
                onOk={() => null}
                onCancel={() => setIsOpenSetting(false)}
                width={1000}
                visible={isOpenSetting}
            >
                <Tabs>
                    <TabPane tab="General" key="1">Content of tab 1</TabPane>
                    <TabPane tab="Label" key="2">Content of tab 2</TabPane>
                    <TabPane tab="Notification" key="3">Content of tab 3</TabPane>
                    <TabPane tab="Color" key="4">Content of tab 4</TabPane>
                </Tabs>
            </Modal>


        </>
    )
}
