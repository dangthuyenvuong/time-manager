import { Button } from 'antd'
import MainLayout from 'components/MainLayout'
import React from 'react'

export default function Knowledge() {
    return (
        <MainLayout
            title="Quản lý sách"
            afterTitle={<Button type='ghost' key={3} size="large">Thêm kỹ năng</Button>}
        >
            <div>Knowledge</div>
        </MainLayout>
    )
}
