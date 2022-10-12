import { ArrowNarrowLeftIcon, BookOpenIcon, ClockIcon, CurrencyDollarIcon, LightBulbIcon, ViewGridIcon } from '@heroicons/react/solid';
import { LanguageOutlined } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { Avatar, Badge, Dropdown, Menu, Modal, PageHeader, Switch, Tabs, Tooltip } from "antd";
import { BOOK_PATH, ENGLISH_PATH, SO_TIET_KIEM_PATH, TO_DO_PATH } from 'config/path';
import { useUser } from 'hooks/useAuth';
import { useState } from 'react';
import { fadeIn } from 'react-animations';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from 'stores/auth.slice';
import styled, { keyframes } from 'styled-components';
import MyAvatar from './organisms/MyAvatar';
import { useProvider } from './Provider';

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
    const navigate = useNavigate()
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
                            <MyAvatar />
                            {title}
                        </Tooltip>
                    </Dropdown>
                    {afterTitle}
                </div>}
                onBack={() => navigate(-1)}
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
                                    <AppItem to={TO_DO_PATH} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <ClockIcon className="w-8 h-8 text-sky-400" />
                                        <span className='mt-1 text-gray-500'>Công việc</span>
                                    </AppItem>
                                    <AppItem to={SO_TIET_KIEM_PATH} className='rounded text-gray-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
                                        <span className='mt-1 text-gray-500'>Tài chính</span>
                                    </AppItem>
                                    <AppItem to={BOOK_PATH} className='rounded text-blur-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <BookOpenIcon className="w-8 h-8 text-blur-400" />
                                        <span className='mt-1 text-gray-500'>Sách</span>
                                    </AppItem>
                                    <AppItem to={'/knowledge'} className='rounded text-fuchsia-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <LightBulbIcon className="w-8 h-8 text-fuchsia-400" />
                                        <span className='mt-1 text-gray-500'>Kiến thức</span>
                                    </AppItem>
                                    <AppItem to={ENGLISH_PATH} className='rounded text-orange-500 hover:bg-primary-100 cursor-pointer flex flex-col justify-center items-center'>
                                        <LanguageOutlined className="w-8 h-8 text-orange-400" />
                                        <span className='mt-1 text-gray-500'>Tiếng Anh</span>
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
