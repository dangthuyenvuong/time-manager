import { Outlet } from "react-router-dom";
import { Divider, Layout } from 'antd'
import Footer from "./Footer";
import Header from "./Header";
import styled from 'styled-components'

const Wrap = styled.div`
    #main-content {
        min-height: calc(100vh - var(--header-height) - var(--footer-height));
        padding: 20px 20px;
    }
`

export default function MainLayout() {
    return (
        <Wrap>
            <Header />
            <Divider style={{ margin: '0' }} />
            <div id="main-content">
                <Outlet />
            </div>
            <Footer />
        </Wrap>
    )
}