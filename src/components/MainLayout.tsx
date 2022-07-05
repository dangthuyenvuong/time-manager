import { Outlet } from "react-router-dom";
import { Layout } from 'antd'
import Footer from "./Footer";
import Header from "./Header";
import styled from 'styled-components'

const { Content } = Layout

const Wrap = styled.div`
    #main-content {
        min-height: calc(100vh - var(--header-height) - var(--footer-height));
        padding: 0 20px;
    }
`

export default function MainLayout() {
    return (
        <Wrap>
            <Header />
            <div id="main-content">
                <Outlet />
            </div>
            <Footer />
        </Wrap>
    )
}