import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const Wrap = styled.div`
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
    display: flex;
    align-items: center;
    justify-content: center;

`

export default function Page404() {
    const navigate = useNavigate()
    return (
        <Wrap>
            <Empty description="Trang này hiện đang không tồn tại, vui lòng quay lại trang chủ để tiếp tục">
                <Button type="primary" onClick={() => navigate('/')}>Trang chủ</Button>
            </Empty>
        </Wrap>
    )
}