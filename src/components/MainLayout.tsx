import { Divider } from 'antd';
import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import Footer from "./Footer";
import Header from "./Header";
import { Provider } from './Provider';

const Wrap = styled.div`
    #main-content {
        min-height: calc(100vh - var(--header-height) - var(--footer-height));
        padding: 20px 20px;
    }
`
export type MainLayoutProps = {
    children?: any
    title: string
    afterTitle?: ReactNode
}
const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
    return (
        <Provider
            {...props}
        >
            <Wrap>
                <Header />
                <Divider style={{ margin: '0' }} />
                <div id="main-content">
                    {children}
                </div>
                <Footer />
            </Wrap>
        </Provider>
    )
}

export default MainLayout