import { Avatar, Layout } from "antd"
import MyAvatar from "./organisms/MyAvatar"

const { Footer: FooterA } = Layout

export default function Footer() {
    return (
        <FooterA className="text-center">Công cụ được tạo bởi Đặng Thuyền Vương
            <MyAvatar /> @2022
        </FooterA>
    )
}
