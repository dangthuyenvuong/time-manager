import { ArrowNarrowLeftIcon, BadgeCheckIcon, ClockIcon, CurrencyDollarIcon, PlusIcon, ViewGridIcon } from '@heroicons/react/solid';
import { IconButton } from "@mui/material";
import { Avatar, Badge, Button, Divider, Dropdown, Input, Menu, Modal, PageHeader, Popconfirm, Select, Switch, Tabs, Tag, Tooltip } from "antd";
import { useUser } from 'hooks/useAuth';
import { useState } from 'react';
import { fadeIn } from 'react-animations';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from 'stores/auth.slice';
import styled, { keyframes } from 'styled-components';
import CountTime from './CountTime';
import { useProvider } from './Provider';
import { ButtonIcon } from './style';

const { TabPane } = Tabs
const MenuWrap = styled.label`
    min-width: 200px;
    cursor: pointer;
`

const fadeInAnimation = keyframes`${fadeIn}`


const GalleryApp = styled.div`
    width: 344px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    animation: .3s ${fadeInAnimation}
}
`

const AppItem = styled(Link)`
    width: 70px;
    height: 70px;

`



export default function Header() {
    const { user } = useUser()
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    // const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [isOpenGalleryApp, setIsOpenGalleryApp] = useState(false)
    // const [isStart, setIsStart] = useState(false)

    const { title, afterTitle } = useProvider()
    const dispatch = useDispatch()


    const accountMenu = [
        {
            label: <MenuWrap className="flex justify-between items-center">Dark mode <Switch size='small' /></MenuWrap>,
            key: 1
        },
        // {
        //     label: <MenuWrap className="flex justify-between items-center" onClick={() => setIsOpenSetting(true)}>Setting</MenuWrap>,
        //     key: 2
        // },
        // {
        //     label: <MenuWrap className="flex justify-between items-center" onClick={() => setIsOpenSetting(true)}>Setting</MenuWrap>,
        //     key: 3
        // },
        {
            label: <MenuWrap className="flex justify-between items-center" onClick={() => dispatch(logoutAction())}>Đăng xuất</MenuWrap>,
            key: 4
        },
    ]

    return (
        <>
            <PageHeader
                title={<div className="flex gap-2 items-center cursor-pointer">
                    <Dropdown
                        trigger={['click']}
                        overlay={<GalleryApp>
                            Những người khác trong gia đình
                        </GalleryApp>}
                    >
                        <Tooltip title="Xem lịch của người thân" placement='right'>
                            <IconButton>
                                <Avatar style={{ margin: 0 }} src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/272402486_1909889179213797_8623708736851518609_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9MYQptuU8XEAX-LEIDN&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8nTf4FrH2MEltjQiyq_fqT4SeRadVnJyn3jW4HraBDPw&oe=62C862C8" />
                            </IconButton>
                            {title}
                        </Tooltip>
                    </Dropdown>
                    {afterTitle}
                </div>}
                onBack={() => null}
                backIcon={
                    <IconButton>
                        <ArrowNarrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </IconButton>
                }
                extra={[
                    <div key={1} className="flex gap-2 items-center">
                        <Dropdown
                            placement='bottomRight'
                            key={1}
                            overlay={<Menu
                                selectable={false}
                                items={accountMenu}
                            />}
                        >
                            <Link to="/profile">
                                <Badge dot color='#53BF9D' offset={[-13, 37]}>
                                    <span className='text-gray-500'>{user?.name}</span>
                                    <IconButton>
                                        <Avatar style={{ margin: 0 }} src={user?.avatar} />
                                    </IconButton>
                                </Badge>
                            </Link>
                        </Dropdown>
                        <Dropdown
                            key={2}
                            trigger={['click']}
                            visible={isOpenGalleryApp}
                            onVisibleChange={open => setIsOpenGalleryApp(open)}
                            overlay={
                                <GalleryApp className='flex flex-wrap gap-2'>
                                    <AppItem to={'/'} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <ClockIcon className="w-8 h-8 text-sky-400" />
                                        <span className='mt-1 text-gray-500'>Thời gian</span>
                                    </AppItem>
                                    <AppItem to={'/financial'} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
                                        <span className='mt-1 text-gray-500'>Tài chính</span>
                                    </AppItem>
                                    {/* <AppItem to={'/'} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
                                        <span className='mt-1 text-gray-500'>Tài khoản</span>
                                    </AppItem>
                                    <AppItem to={'/'} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
                                        <span className='mt-1 text-gray-500'>Ghi chú</span>
                                    </AppItem>
                                    <AppItem to={'/'} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
                                        <span className='mt-1 text-gray-500'>Chat</span>
                                    </AppItem> */}
                                </GalleryApp>
                            }
                        >
                            <IconButton onClick={() => setIsOpenGalleryApp(true)}><ViewGridIcon className="w-5 h-5 text-gray-500" /></IconButton>
                        </Dropdown>
                    </div>

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
